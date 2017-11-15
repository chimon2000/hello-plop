const promptDirectory = require('inquirer-directory')

const prompts = {
    components: [
        {
            type: 'input',
            name: 'name',
            message: 'component name please'
        },
        {
            type: 'directory',
            name: 'destination',
            message: 'where to create',
            basePath: './src'
        },
        {
            type: 'list',
            name: 'type',
            message: 'component type please',
            choices: ['react', 'preact'],
            default: 0
        }
    ]
}

module.exports = function(plop) {
    plop.setPrompt('directory', promptDirectory)

    plop.setHelper('switch', function(value, options) {
        this._switch_value_ = value
        var html = options.fn(this) // Process the body of the switch block
        delete this._switch_value_
        return html
    })

    plop.setHelper('case', function(value, options) {
        if (value == this._switch_value_) {
            return options.fn(this)
        }
    })

    // controller generator
    plop.setGenerator('function', {
        description: 'A simple function',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'controller name please'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/{{name}}.js',
                templateFile: 'plop-templates/fn.ts'
            },

            {
                type: 'modify',
                path: 'src/{{name}}.js',
                pattern: 'fn',
                template: '{{name}}'
            }
        ]
    })

    plop.setGenerator('comp-rc', {
        description: 'A React / Preact Component',
        prompts: prompts.components,
        actions: [
            {
                type: 'add',
                path: 'src/{{destination}}/{{properCase name}}.tsx',
                templateFile: 'plop-templates/components/rc.tsx.hbs'
            }
        ]
    })
    plop.setGenerator('comp-rpc', {
        description: 'A React / Preact Pure Component',
        prompts: prompts.components,
        actions: [
            {
                type: 'add',
                path: 'src/{{destination}}/{{properCase name}}.tsx',
                templateFile: 'plop-templates/components/rpc.tsx.hbs'
            }
        ]
    })
    plop.setGenerator('comp-rsc', {
        description: 'A React / Preact Stateless Component',
        prompts: prompts.components,
        actions: [
            {
                type: 'add',
                path: 'src/{{destination}}/{{properCase name}}.tsx',
                templateFile: 'plop-templates/components/rsc.tsx.hbs'
            }
        ]
    })
}
