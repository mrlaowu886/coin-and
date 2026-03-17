param(
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootFull = [System.IO.Path]::GetFullPath($root)
$indexUrl = "http://localhost:$Port/index.html"

function Get-ContentType {
  param([string]$Path)

  $ext = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
  switch ($ext) {
    ".html" { "text/html; charset=utf-8" }
    ".htm"  { "text/html; charset=utf-8" }
    ".js"   { "application/javascript; charset=utf-8" }
    ".css"  { "text/css; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg"  { "image/svg+xml" }
    ".png"  { "image/png" }
    ".jpg"  { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".gif"  { "image/gif" }
    ".webp" { "image/webp" }
    default { "application/octet-stream" }
  }
}

function Write-HttpResponse {
  param(
    [System.IO.Stream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$BodyBytes,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  if (-not $BodyBytes) {
    $BodyBytes = [System.Text.Encoding]::UTF8.GetBytes("")
  }

  $header =
    "HTTP/1.1 $StatusCode $StatusText`r`n" +
    "Content-Type: $ContentType`r`n" +
    "Content-Length: $($BodyBytes.Length)`r`n" +
    "Connection: close`r`n`r`n"

  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($BodyBytes.Length -gt 0) {
    $Stream.Write($BodyBytes, 0, $BodyBytes.Length)
  }
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
try {
  $listener.Start()
} catch {
  Write-Host "Failed to start local server on port $Port." -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  exit 1
}

Write-Host "Serving files from: $rootFull"
Write-Host "Open in browser: $indexUrl"
Write-Host "Press Ctrl+C to stop."
try {
  Start-Process $indexUrl | Out-Null
} catch {
  Write-Host "Could not auto-open browser. Open this URL manually: $indexUrl" -ForegroundColor Yellow
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)

    try {
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        Write-HttpResponse -Stream $stream -StatusCode 400 -StatusText "Bad Request" -BodyBytes ([System.Text.Encoding]::UTF8.GetBytes("Bad Request"))
        continue
      }

      $parts = $requestLine.Split(" ")
      if ($parts.Length -lt 2) {
        Write-HttpResponse -Stream $stream -StatusCode 400 -StatusText "Bad Request" -BodyBytes ([System.Text.Encoding]::UTF8.GetBytes("Bad Request"))
        continue
      }

      $method = $parts[0].ToUpperInvariant()
      $rawPath = $parts[1]

      while ($true) {
        $line = $reader.ReadLine()
        if ($null -eq $line -or $line -eq "") { break }
      }

      if ($method -ne "GET" -and $method -ne "HEAD") {
        Write-HttpResponse -Stream $stream -StatusCode 405 -StatusText "Method Not Allowed" -BodyBytes ([System.Text.Encoding]::UTF8.GetBytes("Method Not Allowed"))
        continue
      }

      $cleanPath = $rawPath.Split("?")[0]
      $relative = [System.Uri]::UnescapeDataString($cleanPath.TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($relative)) {
        $relative = "index.html"
      }

      $candidate = Join-Path $rootFull $relative
      $fullPath = [System.IO.Path]::GetFullPath($candidate)

      if (-not $fullPath.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
        Write-HttpResponse -Stream $stream -StatusCode 403 -StatusText "Forbidden" -BodyBytes ([System.Text.Encoding]::UTF8.GetBytes("Forbidden"))
        continue
      }

      if (Test-Path $fullPath -PathType Container) {
        $fullPath = Join-Path $fullPath "index.html"
      }

      if (-not (Test-Path $fullPath -PathType Leaf)) {
        Write-HttpResponse -Stream $stream -StatusCode 404 -StatusText "Not Found" -BodyBytes ([System.Text.Encoding]::UTF8.GetBytes("Not Found"))
        continue
      }

      $contentType = Get-ContentType -Path $fullPath
      $bodyBytes = if ($method -eq "HEAD") { [System.Text.Encoding]::UTF8.GetBytes("") } else { [System.IO.File]::ReadAllBytes($fullPath) }
      Write-HttpResponse -Stream $stream -StatusCode 200 -StatusText "OK" -BodyBytes $bodyBytes -ContentType $contentType
    } catch {
      Write-HttpResponse -Stream $stream -StatusCode 500 -StatusText "Internal Server Error" -BodyBytes ([System.Text.Encoding]::UTF8.GetBytes("Server Error"))
    } finally {
      $reader.Dispose()
      $stream.Dispose()
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
