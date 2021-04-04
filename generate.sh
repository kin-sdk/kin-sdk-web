# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

SDK_PATH="libs/sdk"
# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="${SDK_PATH}/src/generated"

mkdir -p $OUT_DIR

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    -I "${SDK_PATH}/proto-common:${SDK_PATH}/proto" \
    "airdrop/v4/airdrop_service.proto" \
    "transaction/v4/transaction_service.proto" \
    "transaction/v3/transaction_service.proto" \
    "common/v4/model.proto" \
    "common/v3/model.proto" \
    "account/v4/account_service.proto" \
    "account/v3/account_service.proto" \
