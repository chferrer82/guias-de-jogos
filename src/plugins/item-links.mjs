// Plugin hast do Sätteri (o processador de Markdown do Astro 7):
// transforma nomes de itens em negrito (**Hookshot**) em links para a ficha do item.
// Só o texto exato de um nome ou apelido vira link; títulos e links existentes ficam como estão.
import { fileURLToPath } from 'node:url';

/**
 * @param {{ names: Record<string, string>; href: (id: string) => string; include: (path: string) => boolean }} options
 */
export default function itemLinks({ names, href, include }) {
	return (/** @type {{ fileURL?: URL }} */ { fileURL }) => {
		if (!fileURL || !include(fileURLToPath(fileURL).replaceAll('\\', '/'))) return;
		return {
			name: 'item-links',
			element: {
				filter: ['strong'],
				visit(node, ctx) {
					const only = node.children.length === 1 ? node.children[0] : undefined;
					if (only?.type !== 'text') return;
					const key = only.value.trim();
					const id = Object.hasOwn(names, key) ? names[key] : undefined;
					if (!id) return;
					for (let p = ctx.parent(node); p; p = ctx.parent(p)) {
						if (p.type === 'element' && (p.tagName === 'a' || /^h[1-6]$/.test(p.tagName))) return;
					}
					ctx.wrapNode(node, {
						type: 'element',
						tagName: 'a',
						properties: { href: href(id), className: ['item-link'], dataItem: id },
						children: [],
					});
				},
			},
		};
	};
}
