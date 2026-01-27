import { DynamicModule, Module } from '@nestjs/common';

export type MyDynamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DINAMIC_CONFIG = 'MY_DINAMIC_CONFIG';

@Module({})
export class MyDynamicModule {
  static register(myModuleConfigs: MyDynamicModuleConfigs): DynamicModule {
    // aqui entro com minhas configurações, se desejar.
    console.log('MyDynamicModule', myModuleConfigs);
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DINAMIC_CONFIG,
          useValue: myModuleConfigs,
        },
      ],
      controllers: [],
      exports: [MY_DINAMIC_CONFIG],
    };
  }
}
