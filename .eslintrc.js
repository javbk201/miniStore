module.exports = {
  root: true,
   extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': 'error',
    'react-native/no-color-literals': 'warn',
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
			"error",
			{
				'allowExpressions': true
			}
		],
		'max-len': [
			'warn',
			{
				'code': 200,
				'ignoreStrings': true
			}
		],
  }
};
