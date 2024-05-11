Set-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Source -Parent)

Start-Process -Wait -FilePath "npm" -ArgumentList "ci"
Start-Process -Wait -FilePath "npm" -ArgumentList "exec", "--", "tsc"

Copy-Item -Path "src\*" -Destination "dist\" -Recurse

Compress-Archive -Force -Path "dist\*" -DestinationPath "YTAdBlock.zip"
