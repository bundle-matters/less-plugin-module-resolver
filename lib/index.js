module.exports = class LessPluginModuleResolver {
    options;
    constructor(options) {
        this.options = options;
    }
    install(less, pluginManager) {
        // noop yet
    }
    minVersion = [2, 1, 1];
};
