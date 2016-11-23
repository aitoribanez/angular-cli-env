var path = require('path');
var Blueprint = require('ember-cli/lib/models/blueprint');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var findParentModule = require('../../utilities/find-parent-module').default;
var getFiles = Blueprint.prototype.files;
// libreria para manipular strings
var stringUtils = require('ember-cli-string-utils');
// wrapper de la libreria @angular-cli/ast-tools para entre otras cosas
// escribir en modulos,componentes...
var astUtils = require('../../utilities/ast-utils');
var NodeHost = require('@angular-cli/ast-tools').NodeHost;
var StringField = require('../../fields/stringField');

module.exports = {
  description: 'Angular CLI addon to create entity crud on backend and frontend.',
  beforeInstall: function () {
    console.log("ON BLUEPRINTS! :_)");
    try {
      this.pathToModule = findParentModule(this.project, this.dynamicPath.dir);
    }
    catch (e) {
      throw "Error locating module for declaration\n\t" + e;
    }
  },
  // da la posibilidad de redefinir el nombre de la entidad
  normalizeEntityName: function (entityName) {
    var parsedPath = dynamicPathParser(this.project, entityName);
    /* { root: '/', dir: 'src/app', base: 'product', ext: '', name: 'product',
         appRoot: 'src/app', sourceDir: 'src' } */
    this.dynamicPath = parsedPath;
    var defaultPrefix = '';
    if (this.project.ngConfig &&
      this.project.ngConfig.apps[0] &&
      this.project.ngConfig.apps[0].prefix) {
      defaultPrefix = this.project.ngConfig.apps[0].prefix + '-';
    }
    var prefix = this.options.prefix ? defaultPrefix : '';
    this.selector = stringUtils.dasherize(prefix + parsedPath.name);
    /* if (this.selector.indexOf('-') === -1) {
        this._writeStatusToUI(chalk.yellow, 'WARNING', 'selectors should contain a dash');
    } */
    return parsedPath.name;
  },
  // mapea las variables retornadas por este método con su plantilla
  locals: function (options) {
    this.styleExt = 'css';
    if (this.project.ngConfig &&
      this.project.ngConfig.defaults &&
      this.project.ngConfig.defaults.styleExt) {
      this.styleExt = this.project.ngConfig.defaults.styleExt;
    }
    options.inlineStyle = options.inlineStyle !== undefined ?
      options.inlineStyle :
      this.project.ngConfigObj.get('defaults.inline.style');
    options.inlineTemplate = options.inlineTemplate !== undefined ?
      options.inlineTemplate :
      this.project.ngConfigObj.get('defaults.inline.template');
    options.spec = options.spec !== undefined ?
      options.spec :
      this.project.ngConfigObj.get('defaults.spec.component');

    const json = {
      'entitys': [
        {
          name: 'product',
          fields: {
            id: { type: 'string', class: 'style', required: 'required' },
            name: { type: 'string' },
            photo: { type: 'string' },
            difficulty: { type: 'number', min: 1, max: 5 },
            seedtime: { type: 'number', min: 1, max: 5 },
            collecttime: { type: 'number', min: 1, max: 5 }
          }
        }
      ]
    };
    
    this.fields = '';
    var stringField = StringField.StringField.prototype;
    var fields = json.entitys[0]['fields'];

    this.entityName = stringUtils.camelize(options.args[1]);
    this.entityNameCapitalize = stringUtils.classify(options.args[1]);

    for (let key in fields) {
      // console.log('data', fields[key]['type'])
      switch (fields[key]['type']) {
        case 'string':
          this.fields += stringField.template(this.entityName, this.entityNameCapitalize, fields[key]);
          break;
        case 'number':
          // console.log('number');
          break;
        /* default:
        default code block */
      }

    }

    console.log(this.fields);

    return {
      dynamicPath: this.dynamicPath.dir.replace(this.dynamicPath.appRoot, ''),
      flat: options.flat,
      spec: options.spec,
      inlineTemplate: options.inlineTemplate,
      inlineStyle: options.inlineStyle,
      route: options.route,
      isAppComponent: !!options.isAppComponent,
      selector: this.selector,
      styleExt: this.styleExt,
      // predefined
      entityName: this.entityName,
      entityNameCapitalize: this.entityNameCapitalize,
      fields: this.fields
    };
  },
  files: function () {
    var fileList = getFiles.call(this);
    if (this.options && this.options.inlineTemplate) {
      fileList = fileList.filter(function (p) { return p.indexOf('.html') < 0; });
    }
    if (this.options && this.options.inlineStyle) {
      fileList = fileList.filter(function (p) { return p.indexOf('.__styleext__') < 0; });
    }
    if (this.options && !this.options.spec) {
      fileList = fileList.filter(function (p) { return p.indexOf('__name__.component.spec.ts') < 0; });
    }
    return fileList;
  },
  // mapea los token (que son las variables que devuelve este metodo:
  // __path__, __resolveName__) con los ficheros
  fileMapTokens: function (options) {
    var _this = this;
    // Return custom template variables here.
    return {
      __path__: function () {
        return _getPath();
      },
      __pathForm__: function () {
        return 'product-form';
      },
      __pathList__: function () {
        return 'product-list';
      },
      __styleext__: function () {
        return _this.styleExt;
      }
    };

    function _getPath() {
      var dir = _this.dynamicPath.dir;
      if (!options.locals.flat) {
        dir += path.sep + options.dasherizedModuleName;
      }
      var srcDir = _this.project.ngConfig.apps[0].root;
      _this.appDir = dir.substr(dir.indexOf(srcDir) + srcDir.length);
      _this.generatePath = dir;

      return dir;
    }
  },
  afterInstall: function (options) {
    // sólo se imprimen los archivos creados y las operaciones realizadas
    if (options.dryRun) {
      return;
    }
    var returns = [];
    var className = stringUtils.classify(options.entity.name + "Component");
    var fileName = stringUtils.dasherize(options.entity.name + ".component");
    var componentDir = path.relative(path.dirname(this.pathToModule), this.generatePath);
    var importPath = componentDir ? "./" + componentDir + "/" + fileName : "./" + fileName;
    if (!options['skip-import']) {
      // añade la declaración del componente al módulo
      returns.push(astUtils.addDeclarationToModule(this.pathToModule, className, importPath)
        .then(function (change) { return change.apply(NodeHost); }));
    }
    return Promise.all(returns);
  }
};
