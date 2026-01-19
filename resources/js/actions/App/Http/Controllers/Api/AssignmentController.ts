import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::index
* @see app/Http/Controllers/Api/AssignmentController.php:30
* @route '/api/assignments'
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
* @see \App\Http\Controllers\Api\AssignmentController::store
* @see app/Http/Controllers/Api/AssignmentController.php:44
* @route '/api/assignments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AssignmentController::store
* @see app/Http/Controllers/Api/AssignmentController.php:44
* @route '/api/assignments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssignmentController::store
* @see app/Http/Controllers/Api/AssignmentController.php:44
* @route '/api/assignments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::store
* @see app/Http/Controllers/Api/AssignmentController.php:44
* @route '/api/assignments'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::store
* @see app/Http/Controllers/Api/AssignmentController.php:44
* @route '/api/assignments'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
export const show = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/assignments/{assignment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
show.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: args.assignment,
    }

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
show.get = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
show.head = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
const showForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
showForm.get = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::show
* @see app/Http/Controllers/Api/AssignmentController.php:66
* @route '/api/assignments/{assignment}'
*/
showForm.head = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
export const update = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/assignments/{assignment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
update.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: args.assignment,
    }

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
update.put = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
update.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
const updateForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
updateForm.put = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::update
* @see app/Http/Controllers/Api/AssignmentController.php:77
* @route '/api/assignments/{assignment}'
*/
updateForm.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\AssignmentController::destroy
* @see app/Http/Controllers/Api/AssignmentController.php:96
* @route '/api/assignments/{assignment}'
*/
export const destroy = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/assignments/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AssignmentController::destroy
* @see app/Http/Controllers/Api/AssignmentController.php:96
* @route '/api/assignments/{assignment}'
*/
destroy.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    if (Array.isArray(args)) {
        args = {
            assignment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assignment: args.assignment,
    }

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssignmentController::destroy
* @see app/Http/Controllers/Api/AssignmentController.php:96
* @route '/api/assignments/{assignment}'
*/
destroy.delete = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::destroy
* @see app/Http/Controllers/Api/AssignmentController.php:96
* @route '/api/assignments/{assignment}'
*/
const destroyForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssignmentController::destroy
* @see app/Http/Controllers/Api/AssignmentController.php:96
* @route '/api/assignments/{assignment}'
*/
destroyForm.delete = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const AssignmentController = { index, store, show, update, destroy }

export default AssignmentController