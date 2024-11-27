import React from 'react';
import { FormDecoratorProps, OrchestratorFormApi } from '@janus-idp/backstage-plugin-orchestrator-form-api';
import { ErrorSchema, FormValidation, RegistryWidgetsType, UiSchema } from '@rjsf/utils';
import {JsonObject} from '@backstage/types';
import { JSONSchema7 } from 'json-schema';
import CountryWidget from './widgets/CountryWidget';
import LanguageWidget from './widgets/LanguageSelectWidget';
import { FormContextData } from './types';

type Data = {
  personalInfo: {
    country: string;
    firstName: string;
    password: string;
    confirmPassword: string;
  }
  languageInfo: {
    language: string;
  }  
}

const reservedNames = ['admin', 'root', 'system'];


const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class CustomFormExtensionsApi implements OrchestratorFormApi {  
    getFormDecorator(_schema: JSONSchema7, _uiSchema: UiSchema<JsonObject>, initialFormData?: JsonObject) {
      return (FormComponent: React.ComponentType<FormDecoratorProps>) => {    
        
        return () => {
          const [formContext, setFormContext] = React.useState<FormContextData>({country: initialFormData?.personalInfo?.country});
          const customValidate = (formData: JsonObject | undefined, errors: FormValidation<JsonObject>): FormValidation<JsonObject> => {
            const _formData = formData as Data | undefined;
            if (_formData?.personalInfo?.password !== _formData?.personalInfo?.confirmPassword) {
              errors.personalInfo?.password?.addError("passwords do not match.");  
            }          
            return errors;
          }         
          const widgets: RegistryWidgetsType<JsonObject, JSONSchema7, any> = {
              LanguageWidget, 
              CountryWidget,
          };
          return (<FormComponent widgets={widgets} onChange={(e) => {
              const data = e.formData as Data;            
              if (data.personalInfo?.country !== formContext.country ) {
                setFormContext({country: data.personalInfo?.country});                    
              }                  
            }} 
            formContext={formContext}            
            customValidate={customValidate}
            getExtraErrors={async (formData: JsonObject) => {
              const _formData = formData as Data;
              return sleep(1000).then(() => { 
                const errors: ErrorSchema<Data> = {};
                if (reservedNames.includes(_formData.personalInfo?.firstName)) {
                  errors.personalInfo = {
                    firstName: {
                      __errors: [`Name ${_formData.personalInfo?.firstName} is reserved`]
                    }
                  }
                }
                return errors;
              })
            }}
        />)};        
      }
    }    
  }
  

export default CustomFormExtensionsApi;