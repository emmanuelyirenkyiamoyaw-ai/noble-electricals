$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5500

Set-Location $root

if (Get-Command py -ErrorAction SilentlyContinue) {
  Start-Process "http://localhost:$port/"
  py -m http.server $port
  exit 0
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  Start-Process "http://localhost:$port/"
  python -m http.server $port
  exit 0
}

Write-Host "Python was not found on this computer." -ForegroundColor Yellow
Write-Host "Install Python, then run this script again to launch the site locally." -ForegroundColor Yellow
