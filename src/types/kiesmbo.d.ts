export interface paths {
    "/api/v1/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Export */
        get: operations["Export"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/studieincijfers/{brin}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** LinksForBRIN */
        get: operations["LinksForBRIN"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/studieincijfers/{brin}/{code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** LeafletForCode */
        get: operations["LeafletForCode"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/studies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Studies */
        get: operations["Studies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/studies/{studyNumber}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** StudyDetails */
        get: operations["StudyDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v2/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ExportV2 */
        get: operations["ExportV2"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v2/studiesexport": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** StudiesexportV2 */
        get: operations["StudiesexportV2"];
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
        FullExport: {
            /** Format: date-time */
            lastUpdated?: string;
            schools?: components["schemas"]["School"][];
            studies?: components["schemas"]["Study"][];
        };
        FullExportV2: {
            /** Format: date-time */
            lastUpdated?: string;
            schools?: components["schemas"]["School"][];
            studies?: components["schemas"]["StudyV2"][];
        };
        School: {
            brin?: string;
            name?: string;
            website?: string;
            locations?: components["schemas"]["Location"][];
        };
        Study: {
            crebo?: string;
            creboName?: string;
            studyNumber?: string;
            profession?: string;
            professionNumber?: string;
            /** Format: int32 */
            level?: number;
            duration?: string;
            introtext?: string;
            youtubeVideoCode?: string;
        };
        StudyV2: {
            crebo?: string;
            creboName?: string;
            studyNumber?: string;
            profession?: string;
            professionNumber?: string;
            /** Format: int32 */
            level?: number;
            duration?: string;
            introtext?: string;
            youtubeVideoCode?: string;
            educationContent?: string;
        };
        Location: {
            brinvest?: string;
            name?: string;
            isMainLocation?: boolean;
            street?: string;
            houseNumber?: string;
            zipCode?: string;
            city?: string;
            province?: string;
            website?: string;
            studies?: components["schemas"]["LocationStudy"][];
            opendays?: components["schemas"]["LocationOpenday"][];
        };
        LocationStudy: {
            crebo?: string;
            learningPaths?: string[];
            startingFebruary?: boolean;
            startingSeptember?: boolean;
            startingAnytime?: boolean;
            hasNumerusFixus?: boolean;
            urls?: components["schemas"]["StudyUrl"][];
        };
        LocationOpenday: {
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string;
            url?: string;
            type?: string;
            isOnline?: boolean;
            isGeneralOpenDay?: boolean;
        };
        StudyUrl: {
            title?: string;
            url?: string;
        };
        StudiesExportV2: {
            /** Format: date-time */
            lastUpdated?: string;
            studies?: components["schemas"]["StudyV2"][];
        };
        ApiResult: {
            hasError?: boolean;
            errorMessage?: string;
            data?: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    Export: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    lastUpdated: components["schemas"]["FullExport"];
                    schools: components["schemas"]["FullExport"];
                    studies: components["schemas"]["FullExport"];
                };
            };
        };
    };
    LinksForBRIN: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                brin: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    HasError: components["schemas"]["ApiResult"];
                    Data: components["schemas"]["ApiResult"];
                };
            };
        };
    };
    LeafletForCode: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                brin: string;
                code: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    HasError: components["schemas"]["ApiResult"];
                    Data: components["schemas"]["ApiResult"];
                };
            };
        };
    };
    Studies: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    HasError: components["schemas"]["ApiResult"];
                    Data: components["schemas"]["ApiResult"];
                };
            };
        };
    };
    StudyDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                studyNumber: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    HasError: components["schemas"]["ApiResult"];
                    Data: components["schemas"]["ApiResult"];
                };
            };
        };
    };
    ExportV2: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    lastUpdated: components["schemas"]["FullExportV2"];
                    schools: components["schemas"]["FullExportV2"];
                    studies: components["schemas"]["FullExportV2"];
                };
            };
        };
    };
    StudiesexportV2: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    lastUpdated: components["schemas"]["StudiesExportV2"];
                    studies: components["schemas"]["StudiesExportV2"];
                };
            };
        };
    };
}
