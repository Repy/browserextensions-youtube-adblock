[void][Reflection.Assembly]::LoadWithPartialName("System.Drawing")
$image = New-Object System.Drawing.Bitmap("./src/icon.png")

foreach ($size in @(16, 24, 48, 120, 128)) {
	$canvas = New-Object System.Drawing.Bitmap($size, $size)
	$graphics = [System.Drawing.Graphics]::FromImage($canvas)
	$graphics.DrawImage($image, (New-Object System.Drawing.Rectangle(0, 0, $size, $size)))
	$canvas.Save("./src./icon-" + $size + ".png", [System.Drawing.Imaging.ImageFormat]::"Png")
	$graphics.Dispose()
	$canvas.Dispose()
}

$image.Dispose()