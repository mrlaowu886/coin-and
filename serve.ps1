param(
  [int]$Port = 8765,
  [string]$Root = 'D:\little boy'
)

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.txt'  = 'text/plain; charset=utf-8'
  '.md'   = 'text/plain; charset=utf-8'
}

function Get-StatusText([int]$statusCode) {
  switch ($statusCode) {
    200 { 'OK' }
    404 { 'Not Found' }
    405 { 'Method Not Allowed' }
    500 { 'Internal Server Error' }
    default { 'OK' }
  }
}

function Send-Response($stream, [int]$statusCode, [byte[]]$body, [string]$contentType) {
  $writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::ASCII, 1024, $true)
  $writer.NewLine = "`r`n"
  $writer.WriteLine("HTTP/1.1 $statusCode $(Get-StatusText $statusCode)")
  $writer.WriteLine("Content-Type: $contentType")
  $writer.WriteLine("Content-Length: $($body.Length)")
  $writer.WriteLine('Cache-Control: no-cache')
  $writer.WriteLine('Connection: close')
  $writer.WriteLine()
  $writer.Flush()
  if ($body.Length -gt 0) {
    $stream.Write($body, 0, $body.Length)
    $stream.Flush()
  }
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse('127.0.0.1'), $Port)
$listener.Start()

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 8192, $true)
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        $client.Close()
        continue
      }

      while ($true) {
        $headerLine = $reader.ReadLine()
        if ($null -eq $headerLine -or $headerLine -eq '') { break }
      }

      $parts = $requestLine.Split(' ')
      $method = if ($parts.Length -ge 1) { $parts[0] } else { 'GET' }
      $target = if ($parts.Length -ge 2) { $parts[1] } else { '/' }

      if ($method -ne 'GET' -and $method -ne 'HEAD') {
        $body = [System.Text.Encoding]::UTF8.GetBytes('Method Not Allowed')
        Send-Response $stream 405 $body 'text/plain; charset=utf-8'
        $client.Close()
        continue
      }

      $pathPart = $target.Split('?')[0]
      $decoded = [System.Uri]::UnescapeDataString($pathPart.TrimStart('/'))
      if ([string]::IsNullOrWhiteSpace($decoded)) { $decoded = 'index.html' }
      $safeRelative = $decoded.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
      $fullPath = [System.IO.Path]::GetFullPath((Join-Path $Root $safeRelative))
      $rootPath = [System.IO.Path]::GetFullPath($Root)

      if (-not $fullPath.StartsWith($rootPath, [System.StringComparison]::OrdinalIgnoreCase)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
        Send-Response $stream 404 $body 'text/plain; charset=utf-8'
        $client.Close()
        continue
      }

      if (Test-Path $fullPath -PathType Container) {
        $fullPath = Join-Path $fullPath 'index.html'
      }

      if (-not (Test-Path $fullPath -PathType Leaf)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
        Send-Response $stream 404 $body 'text/plain; charset=utf-8'
        $client.Close()
        continue
      }

      $ext = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
      $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
      if ($method -eq 'HEAD') {
        Send-Response $stream 200 ([byte[]]::new(0)) $contentType
      } else {
        Send-Response $stream 200 $bytes $contentType
      }
      $client.Close()
    } catch {
      try {
        if ($client -and $client.Connected) {
          $stream = $client.GetStream()
          $body = [System.Text.Encoding]::UTF8.GetBytes('Internal Server Error')
          Send-Response $stream 500 $body 'text/plain; charset=utf-8'
        }
      } catch {}
      if ($client) { $client.Close() }
    }
  }
}
finally {
  $listener.Stop()
}