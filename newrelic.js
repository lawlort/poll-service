'use strict';

require('dotenv').config();

exports.config = {
    /**
     * Array of application names.
     */
    app_name: [process.env.NEW_RELIC_APP_NAME],
    /**
     * Your New Relic license key.
     */
    license_key: process.env.NEW_RELIC_LICENSE_KEY,
    /**
     * This setting controls distributed tracing.
     * Distributed tracing lets you see the path that a request takes through your
     * distributed system. Enabling distributed tracing changes the behavior of some
     * New Relic features, so carefully consult the transition guide before you enable
     * this feature: https://docs.newrelic.com/docs/transition-guide-distributed-tracing
     * Default is true.
     */
    distributed_tracing: {
        enabled: true
    },
    /**
     * Logging configuration.
     */
    logging: {
        level: 'info', // Use 'debug' for more detailed logging
        filepath: 'stdout' // Log to stdout
    },
    /**
     * Attributes related to requests and responses.
     */
    attributes: {
        include: [
            'request.headers.host',
            'request.headers.userAgent',
            'response.status',
            'request.method',
            'request.uri',
            'request.headers.x-request-id' // Track custom headers if relevant
        ],
        exclude: [
            'request.headers.cookie',
            'request.headers.authorization',
            'request.headers.proxyAuthorization',
            'response.headers.setCookie*'
        ]
    },
    /**
     * Set up error collection and ignore certain status codes if needed.
     */
    error_collector: {
        enabled: true,
        ignore_status_codes: [500] // Ignore 404 errors if they are not critical
    },
    /**
     * Track slow transactions.
     */
    transaction_tracer: {
        enabled: true,
        ignore_url_regexes: [],
        record_sql: 'obfuscated', // Record SQL queries, obfuscate them for privacy
        threshold: 'apdex_f' // Capture transactions slower than the Apdex threshold
    },
    /**
     * Capture custom events, like slow queries or high latency responses.
     */
    slow_sql: {
        enabled: true,
        max_samples: 100 // Adjust based on your need
    },
    /**
     * High security mode.
     */
    high_security: false, // Set to true if needed
    /**
     * Capture detailed HTTP request information.
     */
    transaction_events: {
        enabled: true,
        max_samples_per_minute: 10000, // Adjust based on your traffic volume
        attributes: {
            include: ['request.method', 'response.status', 'request.uri']
        }
    },
    application_logging: {
        forwarding: {
            enabled: true
        }
    },

    /**
     * Custom instrumentation if needed.
     */
    custom_instrumentation: {
        enabled: true,
        modules: ['http', 'express'] // Add any modules specific to your app
    }
};
