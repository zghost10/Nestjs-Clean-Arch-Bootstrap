import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Counter, Histogram } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly requestCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly requestDuration: Histogram<string>,
    @InjectMetric('http_status_codes_total')
    private readonly statusCodeCounter: Counter<string>,
    @InjectMetric('http_response_size_bytes_total')
    private readonly responseSizeCounter: Counter<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const { method, route } = req;
    const path = route?.path || req.url;

    const end = this.requestDuration.startTimer({ method, path });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const res = context.switchToHttp().getResponse();
          const status = res.statusCode;

          this.requestCounter.inc({ method, path, status });
          this.statusCodeCounter.inc({ status, method, path });

          const responseSize = data
            ? Buffer.byteLength(JSON.stringify(data), 'utf8')
            : 0;
          this.responseSizeCounter.inc({ method, path }, responseSize);

          end({ status });
        },
        error: (error) => {
          const status = error.status || 500;
          this.requestCounter.inc({ method, path, status });
          this.statusCodeCounter.inc({ status, method, path });
          end({ status });
        },
      }),
    );
  }
}
