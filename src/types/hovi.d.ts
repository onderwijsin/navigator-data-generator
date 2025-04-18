export interface paths {
    "/domain/accrorganization": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["accrorganization"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/accrorganization/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["accrorganization"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["accrorganization"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/consumer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["consumer_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/consumer/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single consumer */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["consumer"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested consumer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["consumer"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/crohosector": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["crohosector"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/crohosector/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["crohosector"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["crohosector"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/crohostudy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["crohostudy"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/crohostudy/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["crohostudy"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["crohostudy"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/degree": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["degree"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/degree/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["degree"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["degree"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/eventtype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["eventtype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/eventtype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["eventtype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["eventtype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/financing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["financing"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/financing/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["financing"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["financing"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/instructionmode": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["instructionmode"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/instructionmode/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["instructionmode"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["instructionmode"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/iscedcluster": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["iscedcluster"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/iscedcluster/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["iscedcluster"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["iscedcluster"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/languageexam": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["languageexam"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/languageexam/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["languageexam"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["languageexam"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/locationtype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["locationtype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/locationtype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["locationtype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["locationtype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/obligation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["obligation"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/obligation/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["obligation"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["obligation"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/organizationtype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["organizationtype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/organizationtype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["organizationtype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["organizationtype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/otherrequirements": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["otherrequirements"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/otherrequirements/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["otherrequirements"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["otherrequirements"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/period": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["period"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/period/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["period"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["period"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/placeinproduct": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["placeinproduct"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/placeinproduct/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["placeinproduct"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["placeinproduct"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/productform": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["productform"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/productform/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["productform"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["productform"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/productlevel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["productlevel"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/productlevel/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["productlevel"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["productlevel"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/productmetatype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["productmetatype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/productmetatype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["productmetatype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["productmetatype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/producttype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["producttype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/producttype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["producttype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["producttype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/scholarship": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["scholarship"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/scholarship/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["scholarship"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["scholarship"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/soi2006classification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["soi2006classification"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/soi2006classification/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["soi2006classification"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["soi2006classification"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/studyroutetype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["studyroutetype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/studyroutetype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["studyroutetype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["studyroutetype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/subject": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["subject"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/subject/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["subject"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["subject"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/testmethod": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["testmethod"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/testmethod/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["testmethod"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["testmethod"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/tuitionfeeincludes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["tuitionfeeincludes"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/tuitionfeeincludes/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["tuitionfeeincludes"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["tuitionfeeincludes"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/tuitionfeetype": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["tuitionfeetype"][];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/tuitionfeetype/{rowkey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a single domain value */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    rowkey: components["schemas"]["tuitionfeetype"]["rowkey"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested domain value */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["tuitionfeetype"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the list of organizations */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of organization ids */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["organization_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an single organization */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An organization */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["organization"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Get an single organization */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Updated organization data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["organization"];
                };
            };
            responses: {
                /** @description The full organization document with the processed updates */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["organization"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all organization contacts */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of contacts */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["contact_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        /** @description Create a new contact */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Contact data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["contact"];
                };
            };
            responses: {
                /** @description Result */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["contact"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/contact/{contactId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a contact */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    contactId: components["schemas"]["contact"]["contactId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A contact */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["contact"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Update a contact */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    contactId: components["schemas"]["contact"]["contactId"];
                };
                cookie?: never;
            };
            /** @description Contact data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["contact"];
                };
            };
            responses: {
                /** @description Result */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["contact"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        /** @description Delete a contact */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    contactId: components["schemas"]["contact"]["contactId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                405: components["responses"]["default405"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/contact/{contactId}/references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the references of to this contact */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    contactId: components["schemas"]["contact"]["contactId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description References to this contact */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["contact_references"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/cooperation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all products from other organizations where this organization is mentioned as participating in a joint degree. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of products */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["cooperation_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/event": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all organization events */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of events */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["event_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        /** @description Create a new event */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Contact data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["event"];
                };
            };
            responses: {
                /** @description Result */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["event"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/event/{eventId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an event */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    eventId: components["schemas"]["event"]["eventId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An event */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["event"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Update an event */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    eventId: components["schemas"]["event"]["eventId"];
                };
                cookie?: never;
            };
            /** @description Event data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["event"];
                };
            };
            responses: {
                /** @description Result */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["event"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        /** @description Delete an event */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    eventId: components["schemas"]["event"]["eventId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                405: components["responses"]["default405"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/event/{eventId}/references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the references of to this event */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    eventId: components["schemas"]["event"]["eventId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description References to this event */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["event_references"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/location": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all organization locations */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of locations */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["location_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        /** @description Create a new location */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Location data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["location"];
                };
            };
            responses: {
                /** @description Result */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["location"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/location/{locationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a location */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    locationId: components["schemas"]["location"]["locationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A location */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["location"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Update a location */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    locationId: components["schemas"]["location"]["locationId"];
                };
                cookie?: never;
            };
            /** @description Location data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["location"];
                };
            };
            responses: {
                /** @description Result */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["location"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        /** @description Delete a location */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    locationId: components["schemas"]["location"]["locationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                405: components["responses"]["default405"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/location/{locationId}/references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the references of to this location */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    locationId: components["schemas"]["location"]["locationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description References to this location */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["location_references"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/media": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all organization media */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of media */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["media_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        /** @description Create a new media */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Media data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["media"];
                };
            };
            responses: {
                /** @description Result */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["media"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/media/{mediaId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an media */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    mediaId: components["schemas"]["media"]["mediaId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An media */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["media"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Update an media */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    mediaId: components["schemas"]["media"]["mediaId"];
                };
                cookie?: never;
            };
            /** @description Media data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["media"];
                };
            };
            responses: {
                /** @description Result */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["media"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        /** @description Delete an media */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    mediaId: components["schemas"]["media"]["mediaId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                405: components["responses"]["default405"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/media/{mediaId}/references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the references of to this media */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    mediaId: components["schemas"]["media"]["mediaId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description References to this media */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["media_references"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/product": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all organization products */
        get: {
            parameters: {
                query?: {
                    state?: components["schemas"]["statequery"];
                };
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of products */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["product_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        /** @description Create a new product */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Product data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["product"];
                };
            };
            responses: {
                /** @description Result */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["product"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/product/{productId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a product */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    productId: components["schemas"]["product"]["productId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A product */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["product"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Update a product */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    productId: components["schemas"]["product"]["productId"];
                };
                cookie?: never;
            };
            /** @description Product data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["product"];
                };
            };
            responses: {
                /** @description Result */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["product"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        /** @description Delete a product */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    productId: components["schemas"]["product"]["productId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                405: components["responses"]["default405"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/product/{productId}/references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the references of to this product */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    productId: components["schemas"]["product"]["productId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description References to this product */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["product_references"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/suborganization": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get all organization suborganizations */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of suborganizations */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["suborganization_list"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        /** @description Create a new suborganization */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                };
                cookie?: never;
            };
            /** @description Suborganization data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["suborganization"];
                };
            };
            responses: {
                /** @description Result */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["suborganization"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/suborganization/{subOrganizationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a suborganization */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    subOrganizationId: components["schemas"]["suborganization"]["subOrganizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A suborganization */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["suborganization"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        /** @description Update a suborganization */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    subOrganizationId: components["schemas"]["suborganization"]["subOrganizationId"];
                };
                cookie?: never;
            };
            /** @description Suborganization data */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["suborganization"];
                };
            };
            responses: {
                /** @description Result */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["suborganization"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                409: components["responses"]["default409"];
                412: components["responses"]["default412"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        post?: never;
        /** @description Delete a suborganization */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    subOrganizationId: components["schemas"]["suborganization"]["subOrganizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                405: components["responses"]["default405"];
                409: components["responses"]["default409"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization/{organizationId}/suborganization/{subOrganizationId}/references": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the references of to this suborganization */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organizationId: components["schemas"]["organization"]["organizationId"];
                    subOrganizationId: components["schemas"]["suborganization"]["subOrganizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description References to this suborganization */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["suborganization_references"];
                    };
                };
                400: components["responses"]["default400"];
                401: components["responses"]["default401"];
                403: components["responses"]["default403"];
                404: components["responses"]["default404"];
                500: components["responses"]["default500"];
                503: components["responses"]["default503"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Describe what we're allowed to access in the HOVI database */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The currently active permissions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description A websocket listing recent HOVI changes */
                            hovilistener?: string;
                            manageOrganizations?: components["schemas"]["organization"]["organizationId"][];
                        };
                    };
                };
                500: components["responses"]["default500"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/state": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the current state of HOVI */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The currently active permissions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {string} */
                            apistate?: "online" | "readonly" | "offline";
                            /** @description A websocket listing only HOVI state changes */
                            hovistatelistener?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        accrorganization: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            webLink?: string;
        };
        /** Format: hovi-address */
        address: {
            city: string;
            /** @description 2 letter country code, see ISO 3166 */
            country: string;
            /** @description Contains house number and subaddressing, eg '13', 13A', '13 - 61' */
            nr_detail?: string;
            street?: string;
            zip?: string;
        };
        /** Format: hovi-address */
        "address-optional": {
            city: string;
            /** @description 2 letter country code, see ISO 3166 */
            country: string;
            /** @description Contains house number and subaddressing, eg '13', 13A', '13 - 61' */
            nr_detail?: string;
            street?: string;
            zip?: string;
        } | null;
        consumer: {
            hoviTypes?: {
                fields?: {
                    about?: {
                        de?: string;
                        en?: string;
                        nl?: string;
                    } | null;
                    field: string;
                }[];
                hoviType: string;
            }[];
            metaTypes?: string[];
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        consumer_list: {
            hoviTypes?: components["schemas"]["consumer"]["hoviTypes"];
            metaTypes?: components["schemas"]["consumer"]["metaTypes"];
            rowkey?: components["schemas"]["consumer"]["rowkey"];
            title?: components["schemas"]["consumer"]["title"];
        }[];
        contact: {
            contactId?: string;
            contactSubjects?: string[];
            email?: string;
            organization?: string | null;
            postalAddress?: components["schemas"]["address-optional"];
            roleName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            userKey?: string;
            visitorAddress?: components["schemas"]["address-optional"];
            webLink?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        contact_list: {
            contactId?: components["schemas"]["contact"]["contactId"];
            email?: components["schemas"]["contact"]["email"];
            organization?: components["schemas"]["contact"]["organization"];
            roleName?: components["schemas"]["contact"]["roleName"];
            userKey?: components["schemas"]["contact"]["userKey"];
        }[];
        contact_references: {
            location?: components["schemas"]["location_list"];
            product?: components["schemas"]["product_list"];
        };
        cooperation: {
            croho?: string | null;
            crohoName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            location?: string | null;
            organization?: string | null;
            productId?: string | null;
            productLevel?: string | null;
            productName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            productType: string;
            subOrganizations?: string[];
            userKey?: string;
        };
        cooperation_list: {
            availableForms?: string[];
            croho?: components["schemas"]["cooperation"]["croho"];
            crohoName?: components["schemas"]["cooperation"]["crohoName"];
            location?: components["schemas"]["cooperation"]["location"];
            organization?: components["schemas"]["cooperation"]["organization"];
            productId?: components["schemas"]["cooperation"]["productId"];
            productLanguages?: string[];
            productLevel?: components["schemas"]["cooperation"]["productLevel"];
            productName?: components["schemas"]["cooperation"]["productName"];
            productType?: components["schemas"]["cooperation"]["productType"];
            subOrganizations?: components["schemas"]["cooperation"]["subOrganizations"];
            userKey?: components["schemas"]["cooperation"]["userKey"];
        }[];
        crohosector: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        crohostudy: {
            crohoSector?: string | null;
            isCurrent?: boolean;
            productLevel?: string | null;
            /** @enum {string} */
            programLevel?: "hbo" | "wo";
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        degree: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        errordescription: {
            code?: string;
            errorid?: string;
            message?: string;
        };
        event: {
            description?: {
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                de?: string;
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                en?: string;
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                nl?: string;
            } | null;
            /** Format: date-time */
            eventEndDate: string;
            eventId?: string;
            eventName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            /** @enum {string} */
            eventPlanning: "default" | "ondemand" | "continuous";
            /** Format: date-time */
            eventStartDate: string;
            eventType: string;
            informationRegistrationURL?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            /** @enum {string} */
            locationType: "location" | "online" | "hybrid";
            locations?: string[];
            onlineEventURL?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            organization?: string | null;
            participatingProducts: {
                croho?: string | null;
                organization?: string | null;
                product: string;
                productForms: string[];
            }[];
            targetRegions?: string[];
            userKey?: string;
        };
        event_list: {
            eventEndDate?: components["schemas"]["event"]["eventEndDate"];
            eventId?: components["schemas"]["event"]["eventId"];
            eventName?: components["schemas"]["event"]["eventName"];
            eventStartDate?: components["schemas"]["event"]["eventStartDate"];
            eventType?: components["schemas"]["event"]["eventType"];
            locationType?: components["schemas"]["event"]["locationType"];
            locations?: components["schemas"]["event"]["locations"];
            organization?: components["schemas"]["event"]["organization"];
            userKey?: components["schemas"]["event"]["userKey"];
        }[];
        event_references: Record<string, never>;
        eventtype: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        financing: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        instructionmode: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        iscedcluster: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        languageexam: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        location: {
            brinVolg?: string;
            contacts?: string[];
            courseCityName?: string;
            description?: {
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                de?: string;
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                en?: string;
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                nl?: string;
            } | null;
            locationEmail?: string;
            locationId?: string;
            locationName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            locationPhone?: string;
            locationType: string;
            organization?: string | null;
            parentLocation?: string | null;
            userKey?: string;
            vestigingSK123Id?: string;
            visitorAddress?: components["schemas"]["address-optional"];
            webLink?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        location_list: {
            brinVolg?: components["schemas"]["location"]["brinVolg"];
            locationId?: components["schemas"]["location"]["locationId"];
            locationName?: components["schemas"]["location"]["locationName"];
            locationType?: components["schemas"]["location"]["locationType"];
            organization?: components["schemas"]["location"]["organization"];
            parentLocation?: components["schemas"]["location"]["parentLocation"];
            userKey?: components["schemas"]["location"]["userKey"];
        }[];
        location_references: {
            cooperation?: components["schemas"]["cooperation_list"];
            event?: components["schemas"]["event_list"];
            location?: components["schemas"]["location_list"];
            product?: components["schemas"]["product_list"];
        };
        locationtype: {
            enableFields?: string[];
            readonlyFields?: string[];
            requireFields?: string[];
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        media: {
            /**
             * Format: hovi-richtext
             * @example <p>This is a text with a <b>bold statement</b>.</p>
             */
            description: string;
            mediaId?: string;
            mediaLink: string;
            /** @enum {string} */
            mediaType: "image" | "video";
            organization?: string | null;
            userKey?: string;
        };
        media_list: {
            description?: components["schemas"]["media"]["description"];
            mediaId?: components["schemas"]["media"]["mediaId"];
            mediaLink?: components["schemas"]["media"]["mediaLink"];
            mediaType?: components["schemas"]["media"]["mediaType"];
            organization?: components["schemas"]["media"]["organization"];
            userKey?: components["schemas"]["media"]["userKey"];
        }[];
        media_references: Record<string, never>;
        obligation: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        organization: {
            brin?: string;
            brinName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            description?: {
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                de?: string;
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                en?: string;
                /**
                 * Format: hovi-richtext
                 * @example <p>This is a text with a <b>bold statement</b>.</p>
                 */
                nl?: string;
            } | null;
            email?: string;
            organizationId?: string;
            organizationType?: string | null;
            phone?: string;
            shortCode?: string;
            webLink?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        organization_list: {
            brin?: components["schemas"]["organization"]["brin"];
            brinName?: components["schemas"]["organization"]["brinName"];
            organizationId?: components["schemas"]["organization"]["organizationId"];
            shortCode?: components["schemas"]["organization"]["shortCode"];
        }[];
        organizationtype: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        otherrequirements: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        period: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        placeinproduct: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        product: {
            accreditations?: {
                accrOrganization: string;
            }[];
            /** Format: date */
            archived?: string;
            contacts?: string[];
            cooperations?: {
                /** @enum {string} */
                cooperationType: "jointdegree" | "jointprogram";
                cooperativePartners: {
                    isSecretary?: boolean;
                    partnerCountry?: string;
                    partnerName?: {
                        de?: string;
                        en?: string;
                        nl?: string;
                    } | null;
                    partnerOrganization?: string;
                }[];
                description?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
            }[];
            /** Format: hovi-decimal */
            credits?: string;
            croho?: string | null;
            crohoName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            crohoSector?: string | null;
            degrees?: string[];
            exchangePrograms?: {
                orgUnitCountry: string;
                orgUnitName?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
                programDescription?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                programName?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
                webLink?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
            }[];
            financing?: string | null;
            increasedTuitionFeeBKKI?: boolean;
            isBKKIProduct?: boolean;
            iscedCluster?: string | null;
            location?: string | null;
            opleidingSK123Id?: string;
            organization?: string | null;
            potentialJobs?: {
                description?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                jobName?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
            }[];
            productForms: {
                admissionDescription?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                admissionSelections?: {
                    capacities?: boolean;
                    grades?: boolean;
                    preEducation?: boolean;
                    testMethod?: string | null;
                    validFor?: ("ownstudents" | "outsideinstitute" | "outsidepartnerships" | "international")[];
                }[];
                admissionTests?: {
                    description?: {
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        de?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        en?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        nl?: string;
                    } | null;
                    testMethod?: string | null;
                }[];
                admissionURL?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
                instructionModeDescription?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                instructionModes?: string[];
                jobPerspective?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                languageRequirements?: {
                    description?: {
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        de?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        en?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        nl?: string;
                    } | null;
                    languageExam: string;
                    minimumScore: string;
                }[];
                numerusFixus?: {
                    capacity?: number;
                    numberOfTries?: number;
                    numerusUrl?: {
                        de?: string;
                        en?: string;
                        nl?: string;
                    } | null;
                }[];
                percentageDistanceLearning?: number;
                percentageForeignStudents?: number;
                percentageNightEducation?: number;
                productDescription?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                productForm: string;
                productLanguages?: {
                    percProductLanguage: number;
                    productLanguage: string;
                }[];
                productResult?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                productStarts?: {
                    /** Format: date */
                    applicationDeadline?: string;
                    /** Format: date */
                    applicationDeadlineNL?: string;
                    /** Format: date */
                    applicationDeadlineNonEU?: string;
                    /** Format: date */
                    endDate?: string;
                    /** Format: date */
                    startingDate?: string;
                }[];
                productURL?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
                scholarships?: {
                    scholarship?: string | null;
                }[];
                sideLocations?: string[];
                studyAbroads?: {
                    explanationAbroad?: {
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        de?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        en?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        nl?: string;
                    } | null;
                    obligatedStudyAbroad?: string | null;
                    percentageStudyAbroad?: number;
                    placeInProduct?: string | null;
                }[];
                studyAdvices?: {
                    binding?: boolean;
                    minimumECTS?: number;
                    period?: number;
                }[];
                studyCosts?: {
                    /** Format: hovi-decimal */
                    amount?: string;
                    description?: {
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        de?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        en?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        nl?: string;
                    } | null;
                }[];
                studyGuideURL?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
                summitCodes?: string[];
                tracks?: {
                    productForm: string;
                    track: string;
                }[];
                tuitionFeeIncludes?: string[];
                tuitionFees?: {
                    /** Format: hovi-decimal */
                    amount: string;
                    definitive?: boolean;
                    description?: {
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        de?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        en?: string;
                        /**
                         * Format: hovi-richtext
                         * @example <p>This is a text with a <b>bold statement</b>.</p>
                         */
                        nl?: string;
                    } | null;
                    tuitionFeePeriod: string;
                    tuitionFeeType: string;
                    year: number;
                }[];
            }[];
            productId?: string;
            productLevel?: string | null;
            productName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            productType: string;
            /** @enum {string} */
            programLevel?: "hbo" | "wo";
            soi2006Classification?: string | null;
            studyChoiceChecks?: {
                checkName?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
                description?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                webLink?: {
                    de?: string;
                    en?: string;
                    nl?: string;
                } | null;
            }[];
            studyRoutes?: {
                brin?: string;
                croho?: string | null;
                description?: {
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    de?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    en?: string;
                    /**
                     * Format: hovi-richtext
                     * @example <p>This is a text with a <b>bold statement</b>.</p>
                     */
                    nl?: string;
                } | null;
                studyRouteType?: string | null;
            }[];
            subOrganizations?: string[];
            tuitionFeeUrl?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            userKey?: string;
        };
        product_list: {
            archived?: components["schemas"]["product"]["archived"];
            availableForms?: string[];
            croho?: components["schemas"]["product"]["croho"];
            crohoName?: components["schemas"]["product"]["crohoName"];
            location?: components["schemas"]["product"]["location"];
            organization?: components["schemas"]["product"]["organization"];
            productId?: components["schemas"]["product"]["productId"];
            productLanguages?: string[];
            productLevel?: components["schemas"]["product"]["productLevel"];
            productName?: components["schemas"]["product"]["productName"];
            productType?: components["schemas"]["product"]["productType"];
            subOrganizations?: components["schemas"]["product"]["subOrganizations"];
            userKey?: components["schemas"]["product"]["userKey"];
        }[];
        product_references: {
            cooperation?: components["schemas"]["cooperation_list"];
            event?: components["schemas"]["event_list"];
            product?: components["schemas"]["product_list"];
        };
        productform: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        productlevel: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        productmetatype: {
            enableFields?: string[];
            readonlyFields?: string[];
            requireFields?: string[];
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        producttype: {
            enableFields?: string[];
            metaType: string;
            readonlyFields?: string[];
            requireFields?: string[];
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        scholarship: {
            comments?: string;
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            webLink?: string;
        };
        soi2006classification: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        /** @enum {string} */
        statequery: "active" | "archived" | "all";
        studyroutetype: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        subject: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        suborganization: {
            organization?: string | null;
            subOrganizationId?: string;
            subOrganizationName?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
            userKey?: string;
        };
        suborganization_list: {
            organization?: components["schemas"]["suborganization"]["organization"];
            subOrganizationId?: components["schemas"]["suborganization"]["subOrganizationId"];
            subOrganizationName?: components["schemas"]["suborganization"]["subOrganizationName"];
            userKey?: components["schemas"]["suborganization"]["userKey"];
        }[];
        suborganization_references: {
            cooperation?: components["schemas"]["cooperation_list"];
            product?: components["schemas"]["product_list"];
        };
        testmethod: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        tuitionfeeincludes: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
        tuitionfeetype: {
            rowkey: string;
            title?: {
                de?: string;
                en?: string;
                nl?: string;
            } | null;
        };
    };
    responses: {
        /** @description Bad request */
        default400: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description Authentication is required */
        default401: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description Access to this resource has been denied */
        default403: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description The requested resource does not exist */
        default404: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description The requested method is not supported for this resource */
        default405: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description A conflict happened when modifying this resource */
        default409: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description The resource has been modified by another user */
        default412: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description An internal error has occurred */
        default500: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
        /** @description Service not available */
        default503: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["errordescription"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
