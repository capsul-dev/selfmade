#!/bin/sh
# Author: João G. Santos
# CAPSUL LTDA

[ ! -d './components' ] && {
  echo 'components dir not found'
  exit 1
}

kebab_to_camel() {
  python -c "import re; print(re.sub(r'(^|\-)(\w)', lambda match: r'{}'.format(match.group(2).upper()), '$1'))"
}

convert_path() {
  TARGET=$(echo -n "$1" | grep -oP '(?<=/)([^/]+)(?=\.vue)')
  BASEDIR=$(echo -n "$1" | sed -r 's/\/([^/]+)\.vue//')

  COMPONENT="C$(kebab_to_camel $TARGET)"
  echo -n "${BASEDIR}/${TARGET}:${BASEDIR}/${COMPONENT}:${COMPONENT}"
}

escape_path() {
  echo -n "${1//\//\\\/}"
}

move_files() {
  PATHS=$(convert_path "$1")
  TARGET=$(echo -n "$PATHS" | cut -d: -f1)
  DESTINATION=$(echo -n "$PATHS" | cut -d: -f2)
  COMPONENT=$(echo -n "$PATHS" | cut -d: -f3)

  # echo "${TARGET} --> ${DESTINATION}"
  # [ ! -d "$DESTINATION" ] && mkdir -p "$DESTINATION"

  # [ -f "${TARGET}.vue" ] && mv "${TARGET}.vue" "${DESTINATION}/${COMPONENT}.vue"
  # [ -f "${TARGET}.spec.js" ] && mv "${TARGET}.spec.js" "${DESTINATION}/${COMPONENT}.spec.js"
}

fix_includes() {
  PATHS=$(grep -oP '@/(\w+/){1,}([^/]+)\.vue' "$1")
  for _PATH in $PATHS; do
    REPLACE=$(convert_path "$_PATH" | cut -d: -f2)
    COMPONENT=$(convert_path "$_PATH" | cut -d: -f3)

    sed -r "s/$(escape_path "$_PATH")/$(escape_path "${REPLACE}/${COMPONENT}.vue")/g" "$1" > /tmp/_tree-cache.txt
    mv /tmp/_tree-cache.txt "$1"
  done
}

export -f kebab_to_camel
export -f convert_path
export -f escape_path
export -f move_files
export -f fix_includes

find . -iname \*\.vue -and -not -path './node_modules/*' | xargs -I{} sh -c 'move_files "{}" && fix_includes "{}"'
