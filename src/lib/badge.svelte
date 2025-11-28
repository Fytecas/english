<script lang="ts">
    let {point} = $props();
</script>

<div id={`badge-${point.id}`}>
    <div class="container right">
    <span class='right_tip'></span>

    <span class="title">{point.title}</span>

    </div>
</div>

<style>
    .top_tip {
        display:block;
        width:1px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 8px solid #f5f5f5;
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
    }

    .right_tip {
        display:block;
        height:1px;
        width: 1px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 8px solid #f5f5f5;
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: left;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .container.right {
        transform: translateX(-65%);
    }

</style>
