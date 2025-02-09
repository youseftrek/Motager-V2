export const loadComponents = async (componentsNames: string[]) => {
  const componentFiles = componentsNames || [];

  const components = await Promise.all(
    componentFiles.map(async (file) => {
      const mod = await import(
        `@/components/themes/minimal-theme/sections/${file}`
      );
      return {
        [file]: mod.default,
      };
    })
  );

  return Object.assign({}, ...components);
};
