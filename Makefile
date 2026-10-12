.PHONY: setup build serve check
setup:
	npm ci --ignore-scripts

build:
	npm run build

serve:
	npm run serve

check: build
	python3 tools/check-site.py
