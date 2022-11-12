module.exports = {
  '**/*.json': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.yml': (filenames) => filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.js': (filenames) =>
    filenames.flatMap((filename) => [
      `prettier --write '${filename}'`,
      `eslint --cache --fix -c .eslintrc.js '${filename}'`,
    ]),
  '**/*.ts?(x)': (filenames) => [
    'tsc -p tsconfig.json --noEmit --skipLibCheck',
    ...filenames.flatMap((filename) => [
      `prettier --write '${filename}'`,
      `eslint --cache --fix -c .eslintrc.js '${filename}'`,
    ]),
  ],
}
