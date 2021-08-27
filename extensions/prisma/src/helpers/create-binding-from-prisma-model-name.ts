import {Binding} from '@loopback/core';
import {PrismaBindings} from '../keys';
import {
  BindingFromPrismaModelNameOptions,
  DEFAULT_PRISMA_BINDING_CREATION_OPTIONS,
} from '../types';

/**
 * Creates a {@link @loopback/core#Binding} instance from the Prisma model under
 * the default or configured namespace, and tagged with the default or
 * configured tags.
 *
 * @remarks
 * Note that the Prisma model name in the {@link @loopback/core#BindingKey} is
 * **not** normalized to lowercase unlike {@link @prisma/client#PrismaClient}.
 *
 * @internalRemarks
 * The Prisma models are not classes; Hence, we are not able to infer their
 * names and require manual input from the function user.
 *
 * @param modelObj TargetPrisma model.
 * @param modelName Prisma model name. This should be taken from
 * {@link @prisma/client#Prisma.ModelName}.
 * @returns A new, unbound, configured {@link @loopback/core#Binding} instance.
 */
export function createBindingFromPrismaModelName<MT = object>(
  modelObj: MT,
  modelName: string,
  options: BindingFromPrismaModelNameOptions = DEFAULT_PRISMA_BINDING_CREATION_OPTIONS,
): Binding<MT> {
  const binding = new Binding(
    `${
      options.namespace ?? PrismaBindings.PRISMA_MODEL_NAMESPACE
    }.${modelName}`,
  ).to(modelObj);

  // Apply tags
  if (Array.isArray(options.tags)) binding.tag(...options.tags);
  else if (options.tags) binding.tag(options.tags);
  else binding.tag(...DEFAULT_PRISMA_BINDING_CREATION_OPTIONS.tags);

  return binding;
}
