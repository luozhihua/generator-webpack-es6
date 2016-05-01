/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-04-22[11:12:44]:revised
 * 2016-05-01[17:43:48]:add LICENSE
 *
 * @author yanni4night@gmail.com
 * @version 1.1.0
 * @since 1.0.0
 */
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the legendary ' + chalk.red('generator-webpack-es6') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'projectName',
            message: 'Project name?',
            default: this.appname
        }, {
            type: 'input',
            name: 'description',
            message: 'Project description',
            default: ''
        }, {
            type: 'input',
            name: 'projectRepository',
            message: 'Git repository',
            default: ''
        }, {
            type: 'input',
            name: 'author',
            message: 'What\'s the author?',
            default: this.user.git.email()
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },

    writing: function () {
        this.props.projectName = this.props.projectName.replace(/\s/m, '-').toLowerCase();
        this.props.projectRepositoryAuthor = this.user.github.username() || 'anonymous';

        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath('src')
        );

        this.fs.copyTpl(
            this.templatePath('test'),
            this.destinationPath('test'), {
                projectName: this.props.projectName
            }
        );

        this.fs.copy(
            this.templatePath('.editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.fs.copy(
            this.templatePath('.eslintignore'),
            this.destinationPath('.eslintignore')
        );
        this.fs.copy(
            this.templatePath('.travis.yml'),
            this.destinationPath('.travis.yml')
        );
        this.fs.copyTpl(
            this.templatePath('.eslintrc'),
            this.destinationPath('.eslintrc')
        );
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'), {
                projectName: this.props.projectName
            }
        );
        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                projectName: this.props.projectName,
                projectRepository: this.props.projectRepository,
                author: this.props.author,
                description: this.props.description
            }
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'), {
                projectName: this.props.projectName,
                author: this.props.author,
                description: this.props.description,
                projectRepositoryAuthor: this.props.projectRepositoryAuthor
            }
        );
        this.fs.copyTpl(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'), {
                author: this.props.author
            }
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'), {
                projectName: this.props.projectName,
                projectRepositoryAuthor: this.props.projectRepositoryAuthor
            }
        );

    },

    install: function () {
        this.npmInstall();
    }
});