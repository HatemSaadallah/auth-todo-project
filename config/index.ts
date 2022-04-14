import devConfig from './configuration.development';
import prodConfig from './configuration.production';

import { ConfigService } from '@nestjs/config';

const NODE_ENV = process.env.NODE_ENV || 'development';


export default NODE_ENV === 'development'
  ? devConfig : prodConfig;