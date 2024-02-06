interface PatientData {
    id: number;
    description?: string[];
    stats: { label: string, value: string | number }[];
    injuries: { part: string, severity: number }[];
}

export const patients: PatientData[] = [
    {
        id: 2,
        description: [
            'Patient suffered a mild concussion and moderate lacerations to the chest and left ear after a fall from a ladder while trying to impress friends.',
            'Advised to follow up with a primary care physician and limit alcohol consumption when with “getting rowdy with the boys.”'
        ],
        stats: [
            { label: 'Date', value: '12/31/2023' },
            { label: 'Age', value: 22 },
            { label: 'Height', value: 6 },
            { label: 'Weight', value: 185 },
            { label: 'Blood Type', value: 'B+' }, // O, A, B, AB
            { label: 'Sex', value: 'M' }
        ],
        injuries: [
            { part: 'head', severity: 44 },
            { part: 'ear-l', severity: 48 },
            { part: 'jaw', severity: 45 },
            { part: 'neck', severity: 16 },
            { part: 'shoulder-l', severity: 28 },
            { part: 'chest-l', severity: 26 },
            { part: 'back-upper', severity: 76 },
            { part: 'chest-r', severity: 50 },
            { part: 'shoulder-r', severity: 10 },
            { part: 'ribs-r', severity: 28 },
            { part: 'hip-r', severity: 48 },
            { part: 'back-lower', severity: 28 },
            { part: 'groin', severity: 28 }
        ]
    },
    {
        id: 3,
        description: [
            'Patient suffered minor bruising to the right knee and left ankle, and dislocated shoulder, after attempting to catch Patient #1.'
        ],
        stats: [
            { label: 'Date', value: '12/31/2023' },
            { label: 'Age', value: 23 },
            { label: 'Height', value: 6.25 },
            { label: 'Weight', value: 228 },
            { label: 'Blood Type', value: 'AB-' }, // O, A, B, AB
            { label: 'Sex', value: 'M' }
        ],
        injuries: [
            { part: 'knee-r', severity: 45 },
            { part: 'quad-r', severity: 12 },
            { part: 'calf-r', severity: 8 },
            { part: 'chest-r', severity: 16 },
            { part: 'shoulder-r', severity: 58 },
            { part: 'back-upper', severity: 10 },
            { part: 'forearm-r', severity: 10 },
            { part: 'hamstring-r', severity: 10 },
            { part: 'hip-l', severity: 18 },
            { part: 'knee-l', severity: 18 },
            { part: 'ankle-l', severity: 52 },
            { part: 'foot-l', severity: 14 }
        ]
    },
    {
        id: 1,
        description: [
            'Patient wrecked her Harley while attempting to put on makeup with her non-smoking hand, suffering fractures to the left elbow, bruising to the right shoulder and right knee.',
            'Patient refused pain medication, stating “I’m a tough old bird, I’ll be fine.”'
        ],
        stats: [
            { label: 'Date', value: '1/04/2024' },
            { label: 'Age', value: 89 },
            { label: 'Height', value: 5.1 },
            { label: 'Weight', value: 96 },
            { label: 'Blood Type', value: 'O+' }, // O, A, B, AB
            { label: 'Sex', value: 'F' }
        ],
        injuries: [
            { part: 'elbow-l', severity: 98 },
            { part: 'bicep-l', severity: 70 },
            { part: 'shoulder-l', severity: 26 },
            { part: 'forearm-l', severity: 52 },
            { part: 'chest-l', severity: 58 },
            { part: 'neck', severity: 12 },
            { part: 'abdomen', severity: 16 },
            { part: 'ribs-l', severity: 10 },
            { part: 'back-upper', severity: 28 },
            { part: 'knee-r', severity: 62 },
            { part: 'shin-r', severity: 42 },
            { part: 'calf-r', severity: 18 },
            { part: 'foot-r', severity: 38 },
            { part: 'quad-r', severity: 8 },
            { part: 'quad-l', severity: 14 },
            { part: 'hamstring-l', severity: 4 }
        ]
    }
]
