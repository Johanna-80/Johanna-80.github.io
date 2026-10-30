"""Comprobación estructural sin dependencias del HTML del portafolio.

Ejecutar: python3 checks/check_markup.py
"""

from html.parser import HTMLParser
from pathlib import Path


VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}


class MarkupChecker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.open_tags = []
        self.main_count = 0
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag == "main":
            self.main_count += 1
        if tag not in VOID_ELEMENTS:
            self.open_tags.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_ELEMENTS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if not self.open_tags:
            self.errors.append(f"Cierre inesperado: </{tag}>")
        elif self.open_tags[-1] != tag:
            self.errors.append(
                f"Orden de etiquetas inválido: se esperaba </{self.open_tags[-1]}> antes de </{tag}>"
            )
        else:
            self.open_tags.pop()


if __name__ == "__main__":
    file = Path(__file__).resolve().parents[1] / "index.html"
    checker = MarkupChecker()
    checker.feed(file.read_text(encoding="utf-8"))
    checker.close()
    assert checker.main_count == 1, "Debe existir un único <main>"
    assert not checker.errors, "\n".join(checker.errors)
    assert not checker.open_tags, f"Etiquetas sin cerrar: {checker.open_tags}"
    print("✓ Etiquetas HTML equilibradas y único contenido principal")
