type Method = "Query" | "Mutation";

export type Resolver = {
    [key: string]: {
        [key: string]: (parent: any, args: { [key: string]: any }, context: {}, info: any) => any;
    };
};
