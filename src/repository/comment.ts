import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, ModelTypes, ModelScalarFields, MODELS_NAME } from './prisma-repo';

// This type will be used if you want to extends the functions in Comment Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.COMMENT]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.COMMENT]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.COMMENT]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.COMMENT]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.COMMENT]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.COMMENT]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.COMMENT]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.COMMENT]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.COMMENT]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.COMMENT>;
type Model = ModelStructure[typeof MODELS_NAME.COMMENT];
/*  eslint-enable @typescript-eslint/no-unused-vars */


class Comment extends BaseRepository(MODELS_NAME.COMMENT) {
}

export default Comment
