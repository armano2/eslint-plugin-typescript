/**
 * @fileoverview Enforces naming of generic type variables.
 * @author Roman Vasilev
 * @author Armano <https://github.com/armano2>
 */
"use strict";

const util = require("../util");

const defaultOptions = [
    // Matches: T , TA , TAbc , TA1Bca , T1 , T2
    "^T([A-Z0-9][a-zA-Z0-9]*){0,1}$",
];

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforces naming of generic type variables",
            category: "TypeScript",
            url: util.metaDocsUrl("generic-type-naming"),
        },
        messages: {
            paramNotMatchRule:
                "Type parameter {{name}} does not match rule {{rule}}.",
        },
        schema: [
            {
                type: "string",
            },
        ],
        recommended: "error",
    },

    create(context) {
        const rule = util.applyDefault(defaultOptions, context.options)[0];
        const regex = new RegExp(rule);

        return {
            TSTypeParameter(node) {
                const name = node.name;

                if (name && !regex.test(name)) {
                    const data = { name, rule };

                    context.report({
                        node,
                        messageId: "paramNotMatchRule",
                        data,
                    });
                }
            },
        };
    },
};
