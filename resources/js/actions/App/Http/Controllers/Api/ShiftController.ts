import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/shifts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::index
* @see app/Http/Controllers/Api/ShiftController.php:24
* @route '/api/shifts'
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

/**
* @see \App\Http\Controllers\Api\ShiftController::store
* @see app/Http/Controllers/Api/ShiftController.php:37
* @route '/api/shifts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/shifts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ShiftController::store
* @see app/Http/Controllers/Api/ShiftController.php:37
* @route '/api/shifts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ShiftController::store
* @see app/Http/Controllers/Api/ShiftController.php:37
* @route '/api/shifts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::store
* @see app/Http/Controllers/Api/ShiftController.php:37
* @route '/api/shifts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::store
* @see app/Http/Controllers/Api/ShiftController.php:37
* @route '/api/shifts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
export const show = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/shifts/{shift}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
show.url = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: args.shift,
    }

    return show.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
show.get = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
show.head = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
const showForm = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
showForm.get = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::show
* @see app/Http/Controllers/Api/ShiftController.php:47
* @route '/api/shifts/{shift}'
*/
showForm.head = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
export const update = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/shifts/{shift}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
update.url = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: args.shift,
    }

    return update.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
update.put = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
update.patch = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
const updateForm = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
updateForm.put = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::update
* @see app/Http/Controllers/Api/ShiftController.php:56
* @route '/api/shifts/{shift}'
*/
updateForm.patch = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\ShiftController::destroy
* @see app/Http/Controllers/Api/ShiftController.php:69
* @route '/api/shifts/{shift}'
*/
export const destroy = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/shifts/{shift}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ShiftController::destroy
* @see app/Http/Controllers/Api/ShiftController.php:69
* @route '/api/shifts/{shift}'
*/
destroy.url = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shift: args }
    }

    if (Array.isArray(args)) {
        args = {
            shift: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        shift: args.shift,
    }

    return destroy.definition.url
            .replace('{shift}', parsedArgs.shift.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ShiftController::destroy
* @see app/Http/Controllers/Api/ShiftController.php:69
* @route '/api/shifts/{shift}'
*/
destroy.delete = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::destroy
* @see app/Http/Controllers/Api/ShiftController.php:69
* @route '/api/shifts/{shift}'
*/
const destroyForm = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ShiftController::destroy
* @see app/Http/Controllers/Api/ShiftController.php:69
* @route '/api/shifts/{shift}'
*/
destroyForm.delete = (args: { shift: string | number } | [shift: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ShiftController = { index, store, show, update, destroy }

export default ShiftController