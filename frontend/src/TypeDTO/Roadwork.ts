type Roadwork = {
    identifier: string;
    icon: string;
    isBlocked: string; // Hier könnte es sinnvoll sein, den Typ auf boolean zu ändern, wenn der Wert entweder "true" oder "false" ist.
    future: boolean;
    extent: string;
    point: string;
    startLcPosition: string;
    impact: {
        lower: string;
        upper: string;
        symbols: string[];
    };
    display_type: string;
    subtitle: string;
    title: string;
    startTimestamp: string;
    coordinate: {
        lat: number;
        long: number;
    };
    description: string[];
    routeRecommendation: any[]; // Hier können Sie den tatsächlichen Typ spezifizieren, wenn er bekannt ist.
    footer: any[]; // Hier können Sie den tatsächlichen Typ spezifizieren, wenn er bekannt ist.
    lorryParkingFeatureIcons: any[]; // Hier können Sie den tatsächlichen Typ spezifizieren, wenn er bekannt ist.
    geometry: {
        type: string;
        coordinates: number[][];
    };
}

export default Roadwork;
