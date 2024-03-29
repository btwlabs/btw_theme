#!/bin/bash
# Script to quickly create sub-theme.

echo '
+-----------------------------------------------------------------------------+
| With this script you could quickly create btw copy theme           |
| In order to use this:                                                       |
| - btw theme (this folder) should be in the themes/contrib folder   |
+-----------------------------------------------------------------------------+
'
echo 'The machine name of your custom theme? [e.g. mycustom_theme]'
read SUB_THEME

echo 'Your theme name ? [e.g. My Custom Theme]'
read SUB_THEME_NAME

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

cd "$SCRIPT_DIR" || exit;
cd ../.. || exit;

cp -r btw_theme "$SUB_THEME"
cd "$SUB_THEME" || exit;
for file in *btw_theme.*; do mv "$file" "${file//btw_theme/$SUB_THEME}"; done
grep -Rl btw_theme .|xargs sed -i '' -e "s/btw_theme/$SUB_THEME/"
LC_ALL=C sed -i '' -e "s/BTW Base/$SUB_THEME_NAME/" "$SUB_THEME.info.yml"

echo "If you are using a Mac the illegal byte error is shown, but it is harmless. In GNU the error occurs but it is not reported."
echo "# Check the themes/custom folder for your new sub-theme."

