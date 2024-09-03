import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, ModelTypes, ModelScalarFields, MODELS_NAME } from './prisma-repo';

// This type will be used if you want to extends the functions in Tag Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.TAG]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.TAG]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.TAG]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.TAG]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.TAG]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.TAG]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.TAG]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.TAG]['Delegate'];
type GroupBy = ModelTypes[typeof MODELS_NAME.TAG]['GroupBy'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.TAG>;
type Model = ModelStructure[typeof MODELS_NAME.TAG];
/*  eslint-enable @typescript-eslint/no-unused-vars */


class Tag extends BaseRepository(MODELS_NAME.TAG) {
}

export default Tag
