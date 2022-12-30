export interface ServiceContext {
  service: string;
  version?: string;
}

export interface ErrorReport {
  message: string;
  eventTime?: string;
  summary?: string;
  reportContext: ServiceContext;
  httpRequest: {
    referrer: string;
    url: string;
    userAgent: string;
    httpMethod?: string;
    remoteIp?: string;
    statusCode?: number;
  };
  reportLocation: {
    filePath?: string;
    lineNumber?: number;
    functionName?: string;
  };
  user?: string;
}

export const getBaseErrorProperties = () => {
  return {
    eventTime: new Date(),
  };
};
