const cfg = opt => {
  return typeof opt === 'object' ? opt : {}
}

module.exports = options => {
  const {
    targets: rawTargets,
    spec,
    loose = false,
    modules = false,
    debug = false,
    include,
    exclude,
    useBuiltIns = 'usage',
    corejs = 2,
    forceAllTransforms,
    configPath,
    ignoreBrowserslistConfig,
    shippedProposals
  } = options
  const presets = [];
  const plugins = [];
  const rawTargets = {
    browsers: [
      'Chrome >= 49',
      'Firefox >= 45',
      'Safari >= 10',
      'Edge >= 13',
      'iOS >= 10',
      'Electron >= 0.36'
    ]
  }

  // preset-env
  presets.push([
    require('@babel/preset-jsx'),
    {
      targets: rawTargets,
      spec,
      loose,
      modules,
      debug,
      include,
      exclude,
      useBuiltIns,
      corejs,
      forceAllTransforms,
      configPath,
      ignoreBrowserslistConfig,
      shippedProposals
    }
  ])

  // react
  if (options.react) {
    presets.push([
      require('@babel/preset-react'),
      cfg(options.react)
    ])
  }

  // vue jsx
  if (options.jsx) {
    presets.push([
      require('@vue/babel-preset-jsx'),
      cfg(options.jsx)
    ])
  }

  // decorators
  plugins.push(
    require('@babel/plugin-proposal-decorators'),
    {
      legacy: true
    }
  )

  return {
    presets,
    plugins
  }
}
