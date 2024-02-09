interface PatientData {
    id: number;
    description?: string[];
    stats: { label: string, value: string | number }[];
    injuries: { part: string, severity: number }[];
}

export const patients: PatientData[] = [
    {
        id: 1,
        description: [
            'Patient came in with dislocated left shoulder, cracked rib, and bruising down left side of body after attempting to teach a horse to do backflips.',
            'Patient was given a sling, advised to rest, and told to make sure the horse’s backflip is caught on video and posted first next time.'
        ],
        stats: [
            { label: 'Date', value: '12/04/2024' },
            { label: 'Age', value: 36 },
            { label: 'Height', value: 5.3 },
            { label: 'Weight', value: 128 },
            { label: 'Blood Type', value: 'B-' }, // O, A, B, AB
            { label: 'Sex', value: 'F' }
        ],
        injuries: [
            { part: 'abdomen', severity: 5 },
            { part: 'ankle-l', severity: 22 },
            { part: 'ankle-r', severity: 0 },
            { part: 'back-lower', severity: 31 },
            { part: 'back-upper', severity: 67 },
            { part: 'bicep-l', severity: 29 },
            { part: 'bicep-r', severity: 0 },
            { part: 'calf-l', severity: 3 },
            { part: 'calf-r', severity: 9 },
            { part: 'chest-l', severity: 58 },
            { part: 'chest-r', severity: 17 },
            { part: 'ear-l', severity: 8 },
            { part: 'ear-r', severity: 0 },
            { part: 'elbow-l', severity: 79 },
            { part: 'elbow-r', severity: 0 },
            { part: 'foot-l', severity: 5 },
            { part: 'foot-r', severity: 7 },
            { part: 'forearm-l', severity: 50 },
            { part: 'forearm-r', severity: 4 },
            { part: 'groin', severity: 0 },
            { part: 'hamstring-l', severity: 0 },
            { part: 'hamstring-r', severity: 0 },
            { part: 'hand-l', severity: 32 },
            { part: 'hand-r', severity: 29 },
            { part: 'head', severity: 50 },
            { part: 'hip-l', severity: 54 },
            { part: 'hip-r', severity: 0 },
            { part: 'jaw', severity: 63 },
            { part: 'knee-l', severity: 75 },
            { part: 'knee-r', severity: 0 },
            { part: 'neck', severity: 21 },
            { part: 'quad-l', severity: 31 },
            { part: 'quad-r', severity: 9 },
            { part: 'ribs-l', severity: 41 },
            { part: 'ribs-r', severity: 12 },
            { part: 'shin-l', severity: 16 },
            { part: 'shin-r', severity: 0 },
            { part: 'shoulder-l', severity: 79 },
            { part: 'shoulder-r', severity: 24 },
            { part: 'wrist-l', severity: 55 },
            { part: 'wrist-r', severity: 30 }
        ]
    },
    {
        id: 2,
        description: [
            'Patient suffered muscular strains in the legs and forearms, along with bruising to both hands and feet, after attempting to break the world record for most pogo stick jumps in a 24-hour period.',
            'Patient did successfully break the record, but was advised to consider new hobbies.'
        ],
        stats: [
            { label: 'Date', value: '12/16/2024' },
            { label: 'Age', value: 41 },
            { label: 'Height', value: 5.9 },
            { label: 'Weight', value: 192 },
            { label: 'Blood Type', value: 'A+' }, // O, A, B, AB
            { label: 'Sex', value: 'M' }
        ],
        injuries: [
            { part: 'abdomen', severity: 18 },
            { part: 'ankle-l', severity: 80 },
            { part: 'ankle-r', severity: 46 },
            { part: 'back-lower', severity: 31 },
            { part: 'back-upper', severity: 5 },
            { part: 'bicep-l', severity: 35 },
            { part: 'bicep-r', severity: 22 },
            { part: 'calf-l', severity: 48 },
            { part: 'calf-r', severity: 33 },
            { part: 'chest-l', severity: 9 },
            { part: 'chest-r', severity: 12 },
            { part: 'ear-l', severity: 0 },
            { part: 'ear-r', severity: 0 },
            { part: 'elbow-l', severity: 23 },
            { part: 'elbow-r', severity: 33 },
            { part: 'foot-l', severity: 79 },
            { part: 'foot-r', severity: 83 },
            { part: 'forearm-l', severity: 72 },
            { part: 'forearm-r', severity: 61 },
            { part: 'groin', severity: 6 },
            { part: 'hamstring-l', severity: 19 },
            { part: 'hamstring-r', severity: 4 },
            { part: 'hand-l', severity: 91 },
            { part: 'hand-r', severity: 77 },
            { part: 'head', severity: 0 },
            { part: 'hip-l', severity: 39 },
            { part: 'hip-r', severity: 29 },
            { part: 'jaw', severity: 0 },
            { part: 'knee-l', severity: 76 },
            { part: 'knee-r', severity: 68 },
            { part: 'neck', severity: 7 },
            { part: 'quad-l', severity: 59 },
            { part: 'quad-r', severity: 41 },
            { part: 'ribs-l', severity: 2 },
            { part: 'ribs-r', severity: 11 },
            { part: 'shin-l', severity: 66 },
            { part: 'shin-r', severity: 51 },
            { part: 'shoulder-l', severity: 15 },
            { part: 'shoulder-r', severity: 29 },
            { part: 'wrist-l', severity: 74 },
            { part: 'wrist-r', severity: 60 }
        ]
    },
    {
        id: 3,
        description: [
            'Patient suffered a mild concussion and moderate lacerations to the chest and left ear after a fall from a ladder while trying to impress friends at a party.',
            'Advised to follow up with a primary care physician and limit alcohol consumption when with “getting rowdy with the boys.”'
        ],
        stats: [
            { label: 'Date', value: '12/31/2023' },
            { label: 'Age', value: 22 },
            { label: 'Height', value: 6.25 },
            { label: 'Weight', value: 185 },
            { label: 'Blood Type', value: 'B+' }, // O, A, B, AB
            { label: 'Sex', value: 'M' }
        ],
        injuries: [
            { part: 'abdomen', severity: 0 },
            { part: 'ankle-l', severity: 0 },
            { part: 'ankle-r', severity: 0 },
            { part: 'back-lower', severity: 38 },
            { part: 'back-upper', severity: 76 },
            { part: 'bicep-l', severity: 0 },
            { part: 'bicep-r', severity: 15 },
            { part: 'calf-l', severity: 0 },
            { part: 'calf-r', severity: 0 },
            { part: 'chest-l', severity: 26 },
            { part: 'chest-r', severity: 64 },
            { part: 'ear-l', severity: 48 },
            { part: 'ear-r', severity: 0 },
            { part: 'elbow-l', severity: 12 },
            { part: 'elbow-r', severity: 40 },
            { part: 'foot-l', severity: 0 },
            { part: 'foot-r', severity: 0 },
            { part: 'forearm-l', severity: 8 },
            { part: 'forearm-r', severity: 27 },
            { part: 'groin', severity: 59 },
            { part: 'hamstring-l', severity: 6 },
            { part: 'hamstring-r', severity: 20 },
            { part: 'hand-l', severity: 4 },
            { part: 'hand-r', severity: 13 },
            { part: 'head', severity: 44 },
            { part: 'hip-l', severity: 19 },
            { part: 'hip-r', severity: 48 },
            { part: 'jaw', severity: 45 },
            { part: 'knee-l', severity: 4 },
            { part: 'knee-r', severity: 16 },
            { part: 'neck', severity: 16 },
            { part: 'quad-l', severity: 0 },
            { part: 'quad-r', severity: 11 },
            { part: 'ribs-l', severity: 3 },
            { part: 'ribs-r', severity: 38 },
            { part: 'shin-l', severity: 5 },
            { part: 'shin-r', severity: 6 },
            { part: 'shoulder-l', severity: 48 },
            { part: 'shoulder-r', severity: 10 },
            { part: 'wrist-l', severity: 1 },
            { part: 'wrist-r', severity: 2 }
        ]
    },
    {
        id: 4,
        description: [
            'Patient suffered minor bruising to the right knee and left ankle, and dislocated shoulder, after attempting to catch Patient #3.'
        ],
        stats: [
            { label: 'Date', value: '12/31/2023' },
            { label: 'Age', value: 23 },
            { label: 'Height', value: 6 },
            { label: 'Weight', value: 228 },
            { label: 'Blood Type', value: 'AB-' }, // O, A, B, AB
            { label: 'Sex', value: 'M' }
        ],
        injuries: [
            { part: 'abdomen', severity: 0 },
            { part: 'ankle-l', severity: 52 },
            { part: 'ankle-r', severity: 39 },
            { part: 'back-lower', severity: 0 },
            { part: 'back-upper', severity: 39 },
            { part: 'bicep-l', severity: 21 },
            { part: 'bicep-r', severity: 24 },
            { part: 'calf-l', severity: 0 },
            { part: 'calf-r', severity: 0 },
            { part: 'chest-l', severity: 0 },
            { part: 'chest-r', severity: 53 },
            { part: 'ear-l', severity: 1 },
            { part: 'ear-r', severity: 17 },
            { part: 'elbow-l', severity: 21 },
            { part: 'elbow-r', severity: 35 },
            { part: 'foot-l', severity: 18 },
            { part: 'foot-r', severity: 10 },
            { part: 'forearm-l', severity: 47 },
            { part: 'forearm-r', severity: 58 },
            { part: 'groin', severity: 0 },
            { part: 'hamstring-l', severity: 0 },
            { part: 'hamstring-r', severity: 0 },
            { part: 'hand-l', severity: 25 },
            { part: 'hand-r', severity: 49 },
            { part: 'head', severity: 28 },
            { part: 'hip-l', severity: 20 },
            { part: 'hip-r', severity: 31 },
            { part: 'jaw', severity: 0 },
            { part: 'knee-l', severity: 16 },
            { part: 'knee-r', severity: 33 },
            { part: 'neck', severity: 50 },
            { part: 'quad-l', severity: 6 },
            { part: 'quad-r', severity: 19 },
            { part: 'ribs-l', severity: 27 },
            { part: 'ribs-r', severity: 43 },
            { part: 'shin-l', severity: 0 },
            { part: 'shin-r', severity: 12 },
            { part: 'shoulder-l', severity: 28 },
            { part: 'shoulder-r', severity: 64 },
            { part: 'wrist-l', severity: 70 },
            { part: 'wrist-r', severity: 14 }
        ]
    },
    {
        id: 5,
        description: [
            'Patient wrecked her Harley while attempting to put on makeup with her non-smoking hand, suffering fractures to the left elbow, bruising to the right shoulder and right knee.',
            'Patient refused pain medication, stating “I’m a tough old bird, I’ll be fine.”'
        ],
        stats: [
            { label: 'Date', value: '1/31/2024' },
            { label: 'Age', value: 89 },
            { label: 'Height', value: 4.92 },
            { label: 'Weight', value: 96 },
            { label: 'Blood Type', value: 'O+' }, // O, A, B, AB
            { label: 'Sex', value: 'F' }
        ],
        injuries: [
            { part: 'abdomen', severity: 16 },
            { part: 'back-upper', severity: 28 },
            { part: 'bicep-l', severity: 70 },
            { part: 'calf-r', severity: 18 },
            { part: 'chest-l', severity: 58 },
            { part: 'elbow-l', severity: 98 },
            { part: 'foot-r', severity: 38 },
            { part: 'forearm-l', severity: 52 },
            { part: 'hamstring-l', severity: 4 },
            { part: 'knee-r', severity: 62 },
            { part: 'neck', severity: 12 },
            { part: 'ribs-l', severity: 10 },
            { part: 'shoulder-l', severity: 26 },
            { part: 'shin-r', severity: 42 },
            { part: 'quad-l', severity: 14 },
            { part: 'quad-r', severity: 8 }
        ]
    }
]
