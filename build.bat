%~d0
cd "%~dp0"
call npm run build
del YTAdBlock.zip
cd dist
..\7za.exe a -tzip ..\YTAdBlock.zip *
cd "%~dp0"
