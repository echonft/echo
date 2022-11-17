module.exports = {
  '**/*.json': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.yaml': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.cjs': (filenames) =>
    filenames.flatMap((filename) => [`prettier --write '${filename}'`, `eslint --cache --fix '${filename}'`]),
  '**/*.js': (filenames) =>
    filenames.flatMap((filename) => [`prettier --write '${filename}'`, `eslint --cache --fix '${filename}'`]),
  '**/*.ts?(x)': (filenames) => [
    ...filenames.flatMap((filename) => [`prettier --write '${filename}'`, `eslint --cache --fix '${filename}'`])
  ]
}
