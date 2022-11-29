export default {
  extends: [
    "@commitlint/config-conventional"
  ],
  rules: {
    // array[0]:  (level) 0 disable 1 warning 2 error
    // array[1]:  (always | never) never: inverts the rule
    // array[2]:  (value)
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'release',
        'style',
        'test',
        'improvement',
      ],
    ]
  }
};
