import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/shifts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Web\ShiftController::index
* @see app/Http/Controllers/Web/ShiftController.php:10
* @route '/shifts'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const ShiftController = { index }

export default ShiftController