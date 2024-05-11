Set-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Source -Parent)
Start-Process -Wait -FilePath "npm" -ArgumentList "ci"
Start-Process -Wait -FilePath "npm" -ArgumentList "run","build"
Compress-Archive -Force -Path "dist\*" -DestinationPath "YTAdBlock.zip"
