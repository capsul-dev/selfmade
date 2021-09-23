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

move_files() {
  PATHS=$(convert_path "$1")
  TARGET=$(echo -n "$PATHS" | cut -d: -f1)
  DESTINATION=$(echo -n "$PATHS" | cut -d: -f2)

  echo "mkdir -p ${BASEDIR}/${COMPONENT}"
  [ -f "${BASEDIR}/${TARGET}.vue" ] && echo "mv ${BASEDIR}/${TARGET}.* ${BASEDIR}/${COMPONENT}"
  [ -f "${BASEDIR}/${TARGET}.spec.js" ] && echo "mv ${BASEDIR}/${TARGET}.* ${BASEDIR}/${COMPONENT}"
}

fix_includes() {
  PATHS=$(grep -oP '@/(\w+/){1,}([^/]+)\.vue' "$1")
  for _PATH in $PATHS; do
    REPLACE=$(convert_path "$_PATH" | cut -d: -f2)
    COMPONENT=$(convert_path "$_PATH" | cut -d: -f3)

    echo "$_PATH -----> $REPLACE/$COMPONENT.vue"
  done
}


export -f kebab_to_camel
export -f convert_path
export -f move_files
export -f fix_includes

find . -iname \*\.vue -and -not -path './node_modules/*' | xargs -I{} sh -c 'fix_includes "{}"'
