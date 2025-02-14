import { degrees } from './degrees'

type HoviOrganization = {
    organizationId: string,
    brin: string,
    brinName: {
        nl: string,
        en: string
    },
    shortCode: string,
    organizationType: string,
    description?: {
        nl?: string,
        en?: string
    },
    phone?: string | null,
    email?: string | null,
    webLink?: {
        nl: string,
        en: string
        [key: string]: string
    }
}


type Organization = {
    title: string,
    code: string,
    description: any, // tiptap JSON
    type: 'mbo' | 'hogeschool' | 'universiteit' | 'onderzoeksuniversiteit' | 'internationaal onderwijs',
    phone: string | null,
    email: string | null,
    website: { url : string, lang: 'Nederlands' | 'Engels' | 'Overig' }[] | null,
    brin_code: string,
    hovi_id: string | null,
    english_title: string | null

    products: Array<Product & { location: Location | null }>
}


type HoviProduct = {
    productId: string,
    productName?: {
        de?: string,
        en?: string,
        nl?: string
    },
    productType: string,
    productForm: string,
    productLevel?: string,
    description?: {
        de?: string,
        en?: string,
        nl?: string
    },
    credits?: string,
    croho?: string,
    crohoName?: {
        de?: string,
        en?: string,
        nl?: string
    },
    crohoSector?: string,
    degrees?: (typeof degrees[number]['rowkey'])[],
    exchangePrograms?: {
        orgUnitCountry: string,
        orgUnitName?: {
            de?: string,
            en?: string,
            nl?: string
        },
        programDescription?: {
            de?: string,
            en?: string,
            nl?: string
        },
        programName?: {
            de?: string,
            en?: string,
            nl?: string
        },
        webLink?: {
            de?: string,
            en?: string,
            nl?: string
        }
    }[],
    financing?: string,
    increasedTuitionFeeBKKI: boolean,
    isBKKIProduct: boolean,
    iscedCluster?: string,
    location?: string,
    organization?: string,
    otherRequirements?: {
        description?: {
            de?: string,
            en?: string,
            nl?: string
        },
        requirement: string
    }[],
    potentialJobs?: {
        description?: {
            de?: string,
            en?: string,
            nl?: string
        },
        jobName?: {
            de?: string,
            en?: string,
            nl?: string
        }
    }[],
    productForms?: {
        admissionDescription?: {
            de?: string,
            en?: string,
            nl?: string
        },
        admissionSelections?: {
            capacities: boolean,
            grades: boolean,
            preEducation: boolean,
            testMethod?: string,
            validFor: ('ownstudents' | 'outsideinstitute' | 'outsidepartnerships' | 'international')[]
        }[],
        admissionTests?: {
            description?: {
                de?: string,
                en?: string,
                nl?: string
            },
            testMethod?: string
        }[],
        admissionURL?: {
            de?: string,
            en?: string,
            nl?: string
        },
        instructionModeDescription?: {
            de?: string,
            en?: string,
            nl?: string
        },
        instructionModes: string[],
        jobPerspective?: {
            de?: string,
            en?: string,
            nl?: string
        },
        languageRequirements?: {
            description?: {
                de?: string,
                en?: string,
                nl?: string
            },
            languageExam: string,
            minimumScore: string
        }[],
        numerusFixus?: {
            capacity: number,
            numberOfTries: number,
            numerusUrl?: {
                de?: string,
                en?: string,
                nl?: string
            }
        }[],
        percentageDistanceLearning: number,
        percentageForeignStudents: number,
        percentageNightEducation: number,
        productDescription?: {
            de?: string,
            en?: string,
            nl?: string
        },
        productResult?: {
            de?: string,
            en?: string,
            nl?: string
        },
        productStarts?: {
            applicationDeadline: string,
            applicationDeadlineNL: string,
            applicationDeadlineNonEU: string,
            endDate: string,
            startingDate: string
        }[],
        productURL?: {
            de?: string,
            en?: string,
            nl?: string
        },
        scholarships?: {
            scholarship?: string
        }[],
        sideLocations: string[],
        studyAbroads?: {
            explanationAbroad?: {
                de?: string,
                en?: string,
                nl?: string
            },
            obligatedStudyAbroad?: string,
            percentageStudyAbroad: number,
            placeInProduct?: string
        }[],
        studyAdvices?: {
            binding: boolean,
            minimumECTS: number,
            period: number
        }[],
        studyCosts?: {
            amount: string,
            description?: {
                de?: string,
                en?: string,
                nl?: string
            }
        }[],
        studyGuideURL?: {
            de?: string,
            en?: string,
            nl?: string
        },
        summitCodes: string[],
        tracks?: {
            productForm: string,
            track: string
        }[],
        tuitionFeeIncludes: string[],
        tuitionFees?: {
            amount: string,
            definitive: boolean,
            description?: {
                de?: string,
                en?: string,
                nl?: string
            },
            tuitionFeePeriod: string,
            tuitionFeeType: string,
            year: number
        }[],
        tuitionFeeUrl?: {
            de?: string,
            en?: string,
            nl?: string
        }
    }[],
    userKey: string
}


type ProductForm = {
    admission_description?: any, // tiptap JSON (nl only)
    admission_selections?: {
        capacities: boolean,
        grades: boolean,
        preEducation: boolean,
        testMethod?: string,
        validFor: ('ownstudents' | 'outsideinstitute' | 'outsidepartnerships' | 'international')[]
    }[],
    admission_tests?: {
        description?: any, // tiptap JSON (nl only)
        testMethod?: string
    }[],
    admission_url?: string,
    instruction_mode_description?: any, // tiptap JSON (nl only)
    instruction_modes: string[],
    job_perspective?: any, // tiptap JSON (nl only)
    lang_requirements_description?: any, // tiptap JSON (nl only)
    lang_exam?: string,
    lang_exam_minimum_score?: string,
    numerus_fixus: boolean,
    numerus_fixus_capacity?: number,
    numerus_fixus_tries?: number,
    numerus_fixus_url?: string,
    product_description?: any, // tiptap JSON (nl only)
    product_description_en?: any, // tiptap JSON
    product_result?: any, // tiptap JSON (nl only)
    application_deadlines: {
        application_deadline: string,
        starting_date: string,
        end_date: string
    }[],
    product_url?: string,
    product_url_en?: string,
    scholarships?: string[],
    study_advices?: {
        binding: boolean,
        minimumECTS: number,
        period: number
    }[],
    study_costs?: {
        amount: string,
        description?: any // tiptap JSON (nl only)
    }[],
    tracks?: {
        productForm: string,
        track: string
    }[],
    tuition_fees?: {
        amount: string,
        definitive: boolean,
        description?: any, // tiptap JSON (nl only)
        tuitionFeePeriod: string,
        tuitionFeeType: string,
        year: number
    }[],
    tuition_fee_url?: string
}

type Product = {
    title: string,
    english_title: string | null,
    product_type: string,
    description: any, // tiptap JSON (nl only)
    product_level?: string,
    croho?: string,
    croho_name?: string,
    degrees?: (typeof degrees[number]['title']['nl'])[],
    croho_sector?: string,
    credits?: string,
    financing?: string,
    location_hovi_id?: string,
    organization_hovi_id?: string,
    product_forms: ProductForm[]
}



type HoviLocation = {
    locationId: string,
    locationName?: {
        nl: string,
        en?: string
    },
    description?: {
        nl?: string,
        en?: string
    },
    visitorAddress?: {
        street?: string,
        nr_detail?: string,
        zip?: string,
        city?: string,
        country?: string
    },
    webLink?: {
        nl: string,
        en?: string
    },
    vestigingSK123Id: string,
}

type Location = {
    hovi_id: string,
    name: string | null // locationName.nl,
    street: string | null // street + houseNumber,
    zip: string | null,
    city: string | null,
    country: string | null
    url: string | null // webLink.nl
    vestiging_SK123_id
}



type OrganizationIds = {
    brin: string
    organizationId: string
}[]

type ProductIds = {
    availableForms: string[],
    croho: string,
    crohoName: {
        en: string,
        nl: string
    },
    location: string,
    organization: string,
    productId: string,
    productLanguages: string[],
    productLevel: string,
    productName: {
        en: string,
        nl: string
    },
    productType: string,
    subOrganizations: string[]
}[]

type LocationIds = {
    brinVolg: string,
    locationId: string,
    locationName?: {
        en?: string,
        nl?: string
    },
    locationType: string,
    organization: string,
    userKey: string
}[]