import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, ModelTypes, ModelScalarFields, MODELS_NAME } from './prisma-repo';

// This type will be used if you want to extends the functions in Post Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.POST]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.POST]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.POST]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.POST]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.POST]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.POST]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.POST]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.POST]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.POST]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.POST>;
type Model = ModelStructure[typeof MODELS_NAME.POST];
/*  eslint-enable @typescript-eslint/no-unused-vars */


class Post extends BaseRepository(MODELS_NAME.POST) {
    findMany() {
        
    }
}

export default Post
