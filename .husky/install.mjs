if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0);
}

const husky = (await import('husky')).default;
console.log(husky());

if (process.platform === 'linux') {
  import('child_process').then(({ execSync }) => {
    try {
      execSync('chmod -R +x .husky');
      console.log('Permissions granted to the .husky folder.');
    } catch (error) {
      console.error('Error granting permissions to the .husky folder:', error);
    }
  });
}
