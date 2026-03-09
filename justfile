# Resume Generator
# Usage:
#   just build              — build all variants (docx + pdf)
#   just build base         — build base only
#   just build founding     — build founding variant only
#   just docx base          — docx only, no pdf
#   just pdf base           — convert existing docx to pdf
#   just clean              — remove generated files
#   just install            — install deps

variants := "base founding aws-security"

# Default: build everything
build variant="all":
    @if [ "{{variant}}" = "all" ]; then \
        for v in {{variants}}; do \
            just _generate $v; \
        done; \
    else \
        just _generate {{variant}}; \
    fi

# Generate docx + pdf for a single variant
_generate variant:
    just docx {{variant}}
    just pdf {{variant}}

# Generate docx only
docx variant:
    node resume.js {{variant}}

# Convert docx → pdf (requires LibreOffice)
pdf variant:
    #!/usr/bin/env bash
    set -euo pipefail
    case {{variant}} in
        base)         file="NicholasFerguson_Resume" ;;
        founding)     file="NicholasFerguson_Resume_Founding" ;;
        aws-security) file="NicholasFerguson_Resume_AWS_Security" ;;
        *)            echo "Unknown variant: {{variant}}"; exit 1 ;;
    esac
    if command -v soffice &> /dev/null; then
        soffice --headless --convert-to pdf "${file}.docx"
    elif command -v libreoffice &> /dev/null; then
        libreoffice --headless --convert-to pdf "${file}.docx"
    else
        echo "⚠ LibreOffice not found — install with: brew install --cask libreoffice"
        echo "  docx generated: ${file}.docx"
        exit 1
    fi

# Install node deps
install:
    npm install

# Clean generated DOCX files
clean-docx: 
  rm -f NicholasFerguson_Resume*.docx

# Clean all generated files
clean:
    rm -f NicholasFerguson_Resume*.docx NicholasFerguson_Resume*.pdf
