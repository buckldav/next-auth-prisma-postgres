# Shoutout to ChatGippity cuz writing bash sucks sometimes

# Check if three arguments are provided
if [ $# -ne 3 ]; then
  echo "Usage: $0 <file_path> <component_name> <story_name>"
  exit 1
fi

# Store arguments in variables
file_path=$1
component_path="${file_path}.tsx"
component_stories_path="${file_path}.stories.tsx"
component_name=$2
story_name=$3

get_file_name() {
  local input_string="$1"
  # Remove any trailing slash(es)
  trimmed_string="${input_string%/}"
  # Extract the content after the last trailing slash
  content_after_slash="${trimmed_string##*/}"
  echo "$content_after_slash"
}

trim_trailing_slash() {
  local input_string="$1"
  # Remove any trailing slash(es)
  trimmed_string="${input_string%/}"
  # Extract the directory before the last trailing slash
  trimmed_string="${input_string%/*}"
  echo "$trimmed_string"
}

file_name=$(get_file_name "$file_path")
directory=$(trim_trailing_slash "$file_path")

# Check if file path exists
if [ ! -d "$file_path" ]; then
  mkdir -p $directory
  echo -e "import * as React from \"react\"\n\nexport type ${component_name}Props = {}\n\nexport function ${component_name}({}: ${component_name}Props) {\n  return <></>\n}" > $component_path
  echo -e "import React from \"react\";\n\nimport { StoryFn, Meta } from \"@storybook/react\";\nimport { ${component_name}Props, ${component_name} } from \"./${file_name}\";\n\nexport default {\n  /* 👇 The title prop is optional.\n   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading\n   * to learn how to generate automatic titles\n   */\n  title: \"${story_name}\",\n  component: ${component_name},\n} as Meta<typeof ${component_name}>;\n\nexport const Primary = {\n  args: {} as ${component_name}Props,\n};" > $component_stories_path
  code $component_path $component_stories_path 
  exit 0
else
  echo "File '$file_path' already exists."
  exit 1
fi

