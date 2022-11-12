module.exports = {
  '**/*.json': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.yml': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.cjs': (filenames) =>
    filenames.flatMap((filename) => [
      `prettier --write '${filename}'`,
      `eslint --cache --fix '${filename}'`,
    ]),
  '**/*.js': (filenames) =>
    filenames.flatMap((filename) => [
      `prettier --write '${filename}'`,
      `eslint --cache --fix '${filename}'`,
    ]),
  '**/*.ts?(x)': (filenames) => [
    'tsc --noEmit --skipLibCheck',
    ...filenames.flatMap((filename) => [
      `prettier --write '${filename}'`,
      `eslint --cache --fix '${filename}'`,
    ]),
  ],
}
