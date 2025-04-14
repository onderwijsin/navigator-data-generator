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
            LastUpdated?: string;
            Schools?: components["schemas"]["School"][];
            Studies?: components["schemas"]["Study"][];
        };
        FullExportV2: {
            /** Format: date-time */
            LastUpdated?: string;
            Schools?: components["schemas"]["School"][];
            Studies?: components["schemas"]["StudyV2"][];
        };
        School: {
            BRIN?: string;
            Name?: string;
            Website?: string;
            Locations?: components["schemas"]["Location"][];
        };
        Study: {
            Crebo?: string;
            CreboName?: string;
            StudyNumber?: string;
            Profession?: string;
            ProfessionNumber?: string;
            /** Format: int32 */
            Level?: number;
            Duration?: string;
            Introtext?: string;
            YoutubeVideoCode?: string;
        };
        StudyV2: {
            Crebo?: string;
            CreboName?: string;
            StudyNumber?: string;
            Profession?: string;
            ProfessionNumber?: string;
            /** Format: int32 */
            Level?: number;
            Duration?: string;
            Introtext?: string;
            YoutubeVideoCode?: string;
            EducationContent?: string;
        };
        Location: {
            BRINVEST?: string;
            Name?: string;
            IsMainLocation?: boolean;
            Street?: string;
            HouseNumber?: string;
            ZipCode?: string;
            City?: string;
            Province?: string;
            Website?: string;
            Studies?: components["schemas"]["LocationStudy"][];
            Opendays?: components["schemas"]["LocationOpenday"][];
        };
        LocationStudy: {
            Crebo?: string;
            LearningPaths?: string[];
            StartingFebruary?: boolean;
            StartingSeptember?: boolean;
            StartingAnytime?: boolean;
            HasNumerusFixus?: boolean;
            Urls?: components["schemas"]["StudyUrl"][];
        };
        LocationOpenday: {
            /** Format: date-time */
            StartDate?: string;
            /** Format: date-time */
            EndDate?: string;
            Url?: string;
            Type?: string;
            IsOnline?: boolean;
            IsGeneralOpenDay?: boolean;
        };
        StudyUrl: {
            Title?: string;
            Url?: string;
        };
        StudiesExportV2: {
            /** Format: date-time */
            LastUpdated?: string;
            Studies?: components["schemas"]["StudyV2"][];
        };
        ApiResult: {
            HasError?: boolean;
            ErrorMessage?: string;
            Data?: Record<string, never>;
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
