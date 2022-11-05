import { ErrorFlow, ErrorTypes, ResultErrorModel } from "../../../src/core";

import { getAbsolutePath, languagesFolder, projectFolder } from '../utils';

const assertDefaultModel: ResultErrorModel[]= [
    new ResultErrorModel(
        'STRING.KEY_FROM_PIPE_VIEW.MISPRINT_IN_IN_LOCALES',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json'),
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_ENUM.EXIST_IN_ALL_LOCALES',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json'),
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_ENUM.EXIST_IN_ONE_LOCALE',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json'),
    ),
    new ResultErrorModel(
        'OBJECT.KEY_FROM_LOCALE.ABSENT_IN_ALL_VIEWS',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json'),
    ),
    new ResultErrorModel(
        'OBJECT.KEY_FROM_ENUM.EXIST_IN_ALL_LOCALES',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json'),
    ),
    new ResultErrorModel(
        'IGNORED.KEY.FLAG',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json')
    ),
    // FEAT 97
    new ResultErrorModel(
        'CUSTOM.REGEXP.ONE',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json')
    ),
    // END FEAT 97
    new ResultErrorModel(
        'STRING.KEY_FROM_ENUM.EXIST_IN_ALL_LOCALES',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-us.json')
    ),
    new ResultErrorModel(
        'OBJECT.KEY_FROM_ENUM.EXIST_IN_ALL_LOCALES',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-us.json')
    ),
    new ResultErrorModel(
        'CUSTOM.REGEXP.ONE',
        ErrorFlow.zombieKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-us.json')
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_DIRECTIVE_VIEW.EXIST_IN_ONE_LOCALE',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'directive.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_DIRECTIVE_VIEW.ABSENT_IN_ALL_LOCALES',
        ErrorFlow.keysOnViews
        , ErrorTypes.error,
        getAbsolutePath(projectFolder, 'directive.keys.html'),
        [
            'EN-eu.json',
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_DIRECTIVE_INSIDE_TAG_VIEW.EXIST_IN_ONE_LOCALE',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'directive.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_DIRECTIVE_INSIDE_TAG_VIEW.EXIST_IN_ONE_LOCALE_BUG_86',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'directive.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'OBJECT.KEY_FROM_DIRECTIVE_INSIDE_TAG_VIEW.ABSENT_IN_ALL_LOCALES',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'directive.keys.html'),
        [
            'EN-eu.json',
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_PIPE_VIEW.EXIST_IN_ONE_LOCALE',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_PIPE_VIEW.ABSENT_IN_ALL_LOCALES',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-eu.json',
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'STRING.KEY_FROM_PIPE_VIEW.MISPRINT_IN_ONE_LOCALES',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-eu.json',
            'EN-us.json'
        ]
    ),
    // BUG92
    new ResultErrorModel(
        'BUG92',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-eu.json',
            'EN-us.json'
        ]
    ),
    // BUG 61
    new ResultErrorModel(
        'carousel.details.title-new',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-eu.json',
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'creatorState.NEW',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'general.buttons.back',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    new ResultErrorModel(
        'general.buttons.back.PART-2',
        ErrorFlow.keysOnViews, ErrorTypes.error,
        getAbsolutePath(projectFolder, 'pipe.keys.html'),
        [
            'EN-us.json'
        ]
    ),
    // END BUG 61

    // FEAT 107
    new ResultErrorModel(
        'EMPTY.KEY',
        ErrorFlow.emptyKeys, ErrorTypes.warning,
        getAbsolutePath(languagesFolder, 'EN-eu.json')
    ),
    // END FEAT 107
];

export { assertDefaultModel };
