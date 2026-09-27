$ErrorActionPreference = "Stop"
$base = "C:\Users\28176\wonder-forge"
$files = git -C $base ls-tree -r --name-only 42f61fa
$count = 0
$total = $files.Count
foreach ($f in $files) {
    $count++
    $dest = Join-Path $base "wonder-forge\$f"
    $destDir = Split-Path -Parent $dest
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    $ref = "42f61fa" + ":" + $f
    $tmpFile = Join-Path $env:TEMP "wf_extract_$count"
    git -C $base show $ref > $tmpFile 2>$null
    if (Test-Path $tmpFile) {
        $size = (Get-Item $tmpFile).Length
        if ($size -gt 0) {
            Copy-Item -LiteralPath $tmpFile -Destination $dest -Force
        }
        Remove-Item -LiteralPath $tmpFile -Force
    }
    if ($count % 50 -eq 0) { Write-Output "Progress: $count / $total" }
}
Write-Output "Done: $count files extracted"
