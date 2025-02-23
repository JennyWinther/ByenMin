export type Melding = {
    id: number;
    threadId: string;
    category: string;
    district: string;
    municipality: string;
    area: string;
    isActive: boolean;
    text: string;
    createdOn: string;
    updatedOn: string;
    previouslyIncludedImage: string; //url
    isEdited: boolean;
}

export type Query = {
    url: string;
}

